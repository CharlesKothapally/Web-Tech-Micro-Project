const shipments = {
  "FDX123456": {
    id: "FDX123456",
    status: "In Transit",
    progress: 55,
    eta: "Nov 15, 2025, 5:00 PM",
    route: [
      [19.076, 72.8777], // Mumbai
      [23.0225, 72.5714], // Ahmedabad
      [28.6139, 77.209], // Delhi
    ],
  },
  "DHL987654": {
    id: "DHL987654",
    status: "Out for Delivery",
    progress: 85,
    eta: "Nov 13, 2025, 3:30 PM",
    route: [
      [12.9716, 77.5946], // Bengaluru
      [13.0827, 80.2707], // Chennai
    ],
  },
  "IND543210": {
    id: "IND543210",
    status: "Delivered",
    progress: 100,
    eta: "Delivered on Nov 12, 2025",
    route: [
      [17.385, 78.4867], // Hyderabad
      [16.5062, 80.648], // Vijayawada
      [15.8281, 78.0373], // Kurnool
    ],
  },
  "UPS112233": {
    id: "UPS112233",
    status: "In Transit",
    progress: 40,
    eta: "Nov 17, 2025, 10:00 AM",
    route: [
      [22.5726, 88.3639], // Kolkata
      [23.8103, 90.4125], // Dhaka
    ],
  },
  "BLR667788": {
    id: "BLR667788",
    status: "Out for Delivery",
    progress: 75,
    eta: "Nov 16, 2025, 1:00 PM",
    route: [
      [19.076, 72.8777], // Mumbai
      [18.5204, 73.8567], // Pune
    ],
  },
  "MUM998877": {
    id: "MUM998877",
    status: "Delivered",
    progress: 100,
    eta: "Delivered on Nov 14, 2025",
    route: [
      [28.6139, 77.209], // Delhi
      [26.9124, 75.7873], // Jaipur
      [19.076, 72.8777], // Mumbai
    ],
  },
  "CHN556677": {
    id: "CHN556677",
    status: "In Transit",
    progress: 30,
    eta: "Nov 18, 2025, 6:00 PM",
    route: [
      [13.0827, 80.2707], // Chennai
      [12.2958, 76.6394], // Mysore
      [11.0168, 76.9558], // Coimbatore
    ],
  },
  "DEL334455": {
    id: "DEL334455",
    status: "Out for Delivery",
    progress: 90,
    eta: "Nov 15, 2025, 4:00 PM",
    route: [
      [28.7041, 77.1025], // Delhi
      [27.1767, 78.0081], // Agra
    ],
  },
  "HYD778899": {
    id: "HYD778899",
    status: "Delivered",
    progress: 100,
    eta: "Delivered on Nov 13, 2025",
    route: [
      [17.385, 78.4867], // Hyderabad
      [16.5062, 80.648], // Vijayawada
    ],
  },
  "PNQ445566": {
    id: "PNQ445566",
    status: "In Transit",
    progress: 20,
    eta: "Nov 19, 2025, 12:00 PM",
    route: [
      [18.5204, 73.8567], // Pune
      [19.076, 72.8777], // Mumbai
      [15.2993, 74.1240], // Goa
    ],
  },
};


let map; // global map variable
let routeLayer;

document.getElementById("trackBtn").addEventListener("click", () => {
  const input = document.getElementById("trackingNumber").value.trim().toUpperCase();
  const resultBox = document.getElementById("trackingResult");

  if (shipments[input]) {
    const shipment = shipments[input];
    document.getElementById("shipmentId").textContent = shipment.id;
    document.getElementById("statusText").textContent = shipment.status;
    document.getElementById("etaText").textContent = shipment.eta;

    const progressFill = document.getElementById("progressFill");
    progressFill.style.width = shipment.progress + "%";
    progressFill.style.background =
      shipment.status === "Delivered"
        ? "#16a34a"
        : shipment.status === "Out for Delivery"
        ? "#f59e0b"
        : "#3b82f6";

    resultBox.classList.remove("hidden");
    loadMap(shipment.route);
  } else {
    alert("Tracking number not found. Please try again.");
    resultBox.classList.add("hidden");
  }
});

function loadMap(route) {
  const mapContainer = document.getElementById("map");

  if (!map) {
    map = L.map("map").setView(route[0], 6);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);
  }

  if (routeLayer) {
    map.removeLayer(routeLayer);
  }

  routeLayer = L.polyline(route, { color: "blue", weight: 4 }).addTo(map);
  map.fitBounds(routeLayer.getBounds());

  L.marker(route[0]).addTo(map).bindPopup("Shipment Origin");
  L.marker(route[route.length - 1]).addTo(map).bindPopup("Destination");

  setTimeout(() => {
    map.invalidateSize();
  }, 300);
}

