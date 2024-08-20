document.addEventListener("DOMContentLoaded", () => {
  // Select form and list elements
  const addPropertyForm = document.getElementById("add-property-form");
  const propertyList = document.getElementById("property-list");

  // Fetch properties from the API and render them
  async function fetchProperties() {
    try {
      const response = await fetch("/api/properties");
      const properties = await response.json();
      renderProperties(properties);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  }

  // Add a new property to the API
  async function addProperty(property) {
    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
      });
      if (response.ok) {
        fetchProperties(); // Refresh the property list
      } else {
        alert("Failed to add property.");
      }
    } catch (error) {
      console.error("Error adding property:", error);
    }
  }

  // Delete a property from the API
  async function deleteProperty(propertyId) {
    try {
      const response = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchProperties(); // Refresh the property list
      } else {
        alert("Failed to delete property.");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  }

  // Add a new workspace to a specific property
  async function addWorkspace(propertyId, workspace) {
    try {
      const response = await fetch(`/api/properties/${propertyId}/workspaces`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(workspace),
      });
      if (response.ok) {
        fetchProperties(); // Refresh the property list
      } else {
        alert("Failed to add workspace.");
      }
    } catch (error) {
      console.error("Error adding workspace:", error);
    }
  }

  // Render properties and their workspaces
  function renderProperties(properties) {
    propertyList.innerHTML = "";
    properties.forEach((property) => {
      if (
        typeof property.address !== "string" ||
        typeof property.neighborhood !== "string" ||
        typeof property.squareFeet !== "number"
      ) {
        console.warn("Skipping invalid property:", property);
        return;
      }

      const li = document.createElement("li");
      li.innerHTML = `
        <div>
          <strong>${property.address}</strong><br>
          Neighborhood: ${property.neighborhood}<br>
          Square Feet: ${property.squareFeet}<br>
          Parking Garage: ${property.parkingGarage ? "Yes" : "No"}<br>
          Public Transportation: ${property.publicTransportation ? "Yes" : "No"}<br>
          <button class="add-workspace-btn" data-id="${property.id}">Add Workspace</button>
          <button class="delete-property-btn" data-id="${property.id}">Delete Property</button>
        </div>
        <div id="workspaces-list-${property.id}"></div>
        <div id="workspace-form-container-${property.id}" style="display:none;">
          <form id="workspace-form-${property.id}">
            <input type="text" id="workspace-name-${property.id}" placeholder="Workspace Name" required />
            <label for="workspace-room-type-${property.id}">Room Type:</label>
            <select id="workspace-room-type-${property.id}" required>
              <option value="Meeting Room">Meeting Room</option>
              <option value="Private Office Room">Private Office Room</option>
              <option value="Desk">Desk</option>
            </select>
            <input type="number" id="workspace-available-seats-${property.id}" placeholder="Available Seats" required />
            <input type="number" id="workspace-price-${property.id}" placeholder="Price" required />
            <label>
              Smoking Allowed:
              <input type="checkbox" id="workspace-smoking-${property.id}" />
            </label>
            <label for="workspace-lease-term-${property.id}">Lease Term:</label>
            <select id="workspace-lease-term-${property.id}" required>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
            <label>
              Deactivate:
              <input type="checkbox" id="workspace-deactivate-${property.id}" />
            </label>
            <button type="submit">Add Workspace</button>
          </form>
        </div>
      `;
      propertyList.appendChild(li);

      // Attach event listener to the workspace form
      const workspaceForm = document.getElementById(
        `workspace-form-${property.id}`,
      );
      workspaceForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const workspace = {
          name: document.getElementById(`workspace-name-${property.id}`).value,
          roomType: document.getElementById(
            `workspace-room-type-${property.id}`,
          ).value,
          availableSeats: parseInt(
            document.getElementById(`workspace-available-seats-${property.id}`)
              .value,
          ),
          price: parseFloat(
            document.getElementById(`workspace-price-${property.id}`).value,
          ),
          smoking: document.getElementById(`workspace-smoking-${property.id}`)
            .checked,
          leaseTerm: document.getElementById(
            `workspace-lease-term-${property.id}`,
          ).value,
          deactivate: document.getElementById(
            `workspace-deactivate-${property.id}`,
          ).checked,
        };
        addWorkspace(property.id, workspace);
        document.getElementById(
          `workspace-form-container-${property.id}`,
        ).style.display = "none";
      });

      // Load and display existing workspaces
      showWorkspaces(property.id);
    });

    // Attach event listeners to dynamically created buttons
    document.querySelectorAll(".add-workspace-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const propertyId = e.target.dataset.id;
        toggleWorkspaceForm(propertyId);
      });
    });

    document.querySelectorAll(".delete-property-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const propertyId = e.target.dataset.id;
        deleteProperty(propertyId);
      });
    });
  }

  // Toggle visibility of workspace form
  function toggleWorkspaceForm(propertyId) {
    const formContainer = document.getElementById(
      `workspace-form-container-${propertyId}`,
    );
    formContainer.style.display =
      formContainer.style.display === "none" ? "block" : "none";
  }

  // Handle property form submission
  addPropertyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const property = {
      address: document.getElementById("property-address").value,
      neighborhood: document.getElementById("property-neighborhood").value,
      squareFeet: parseInt(
        document.getElementById("property-square-feet").value,
      ),
      parkingGarage: document.getElementById("property-parking-garage").checked,
      publicTransportation: document.getElementById(
        "property-public-transportation",
      ).checked,
    };

    if (
      !property.address ||
      !property.neighborhood ||
      isNaN(property.squareFeet)
    ) {
      alert("Please fill out all required fields.");
      return;
    }

    addProperty(property);
    addPropertyForm.reset();
  });

  // Initial load of properties
  fetchProperties();

  // Show existing workspaces for a property
  async function showWorkspaces(propertyId) {
    const workspacesList = document.getElementById(
      `workspaces-list-${propertyId}`,
    );
    try {
      const response = await fetch(`/api/properties/${propertyId}/workspaces`);
      const workspaces = await response.json();
      workspacesList.innerHTML = workspaces
        .map(
          (ws) => `
          <div>
            <strong>${ws.name}</strong><br>
            Room Type: ${ws.roomType}<br>
            Available Seats: ${ws.availableSeats}<br>
            Price: $${ws.price}<br>
            Smoking Allowed: ${ws.smoking ? "Yes" : "No"}<br>
            Lease Term: ${ws.leaseTerm}<br>
            Deactivate: ${ws.deactivate ? "Yes" : "No"}<br>
            <button onclick="editWorkspace(${propertyId}, ${ws.id})">Edit Workspace</button>
            <button onclick="deleteWorkspace(${propertyId}, ${ws.id})">Delete Workspace</button>
          </div>
        `,
        )
        .join("");
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  }
});
