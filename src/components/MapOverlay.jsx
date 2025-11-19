import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Try to extract lat/lng from chapter.location
function getLatLng(chapter) {
  const loc = chapter?.location
  if (!loc) return null
  if (typeof loc === 'object' && typeof loc.lat === 'number' && typeof loc.lng === 'number') {
    return { lat: loc.lat, lng: loc.lng }
  }
  if (Array.isArray(loc) && loc.length === 2) {
    const [lat, lng] = loc
    if (typeof lat === 'number' && typeof lng === 'number') return { lat, lng }
  }
  return null // might be a string, will geocode
}

async function geocode(query) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
  const res = await fetch(url, {
    headers: {
      'Accept': 'application/json'
    }
  })
  if (!res.ok) throw new Error('Geocoding failed')
  const json = await res.json()
  if (json && json.length) {
    const { lat, lon } = json[0]
    return { lat: parseFloat(lat), lng: parseFloat(lon) }
  }
  return null
}

export default function MapOverlay({ chapters, active, onSelect }) {
  const mapRef = useRef(null)
  const containerRef = useRef(null)
  const markersRef = useRef(new Map())
  const [geoCache, setGeoCache] = useState(new Map())

  // memo of minimal chapter identity to avoid heavy rerenders
  const items = useMemo(() => (chapters || []).map(c => ({
    id: c.id || c._id || c.slug || c.title,
    title: c.title,
    location: c.location,
    raw: c,
  })), [chapters])

  // init map
  useEffect(() => {
    if (mapRef.current || !containerRef.current) return
    const map = L.map(containerRef.current, {
      zoomControl: false,
      attributionControl: false
    }).setView([20, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map)
    mapRef.current = map
    // add subtle controls
    L.control.zoom({ position: 'bottomleft' }).addTo(map)
  }, [])

  // ensure markers match chapters
  useEffect(() => {
    const map = mapRef.current
    if (!map) return

    // add/update markers
    const ensureMarker = async (item) => {
      const key = item.id
      if (markersRef.current.has(key)) return

      let ll = getLatLng(item.raw)
      if (!ll && typeof item.location === 'string') {
        try {
          if (geoCache.has(key)) {
            ll = geoCache.get(key)
          } else {
            ll = await geocode(item.location)
            if (ll) setGeoCache(prev => new Map(prev).set(key, ll))
          }
        } catch (e) {
          // ignore geocode errors
        }
      }
      if (!ll) return

      const marker = L.circleMarker([ll.lat, ll.lng], {
        radius: 6,
        color: 'rgba(34,211,238,0.8)',
        weight: 2,
        fillColor: 'rgba(34,211,238,0.25)',
        fillOpacity: 1
      }).addTo(map)
      marker.on('click', () => onSelect?.(item.raw))
      marker.bindTooltip(item.title, { direction: 'top' })
      markersRef.current.set(key, { marker, ll })
    }

    items.forEach((it) => { ensureMarker(it) })

    // cleanup removed markers
    const ids = new Set(items.map(i => i.id))
    for (const [key, val] of markersRef.current.entries()) {
      if (!ids.has(key)) {
        map.removeLayer(val.marker)
        markersRef.current.delete(key)
      }
    }
  }, [items, onSelect, geoCache])

  // highlight active
  useEffect(() => {
    const map = mapRef.current
    if (!map) return
    // reset styles
    for (const { marker } of markersRef.current.values()) {
      marker.setStyle({ radius: 6, color: 'rgba(34,211,238,0.8)', fillColor: 'rgba(34,211,238,0.25)' })
    }

    if (active) {
      const key = active.id || active._id || active.slug || active.title
      const item = markersRef.current.get(key)
      if (item) {
        item.marker.setStyle({ radius: 9, color: 'rgba(59,130,246,0.9)', fillColor: 'rgba(59,130,246,0.35)' })
        map.panTo([item.ll.lat, item.ll.lng], { animate: true })
      }
    }
  }, [active])

  return (
    <div className="pointer-events-auto fixed bottom-6 right-6 z-40 w-[320px] h-[220px] rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-2 left-3 text-xs text-white/80 bg-black/30 px-2 py-1 rounded-md border border-white/10">Live Map</div>
    </div>
  )
}
