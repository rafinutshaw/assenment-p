import { apiClient } from "./axios";
import { Area } from "./models/area";
import { City } from "./models/city";
import { Store } from "./models/store";
import { Zone } from "./models/zone";
export class Service {
  static async getStoreList() {
    let response = await apiClient.get("/hermes/api/v1/store-list");
    if (response.status == 200) {
      let stores = response.data.data.map((e) => new Store(e));
      return stores;
    } else {
      return [];
    }
  }
  static async getZoneList() {
    let response = await apiClient.get("/hermes/api/v1/cities/1/zone-list");
    if (response.status == 200) {
      let zones = response.data.data.data.map((e) => new Zone(e));
      return zones;
    } else {
      return [];
    }
  }
  static async getAreaList() {
    let response = await apiClient.get("/hermes/api/v1/zones/298/area-list");
    if (response.status == 200) {
      let areas = response.data.data.data.map((e) => new Area(e));
      return areas;
    } else {
      return [];
    }
  }
  static async getCityList() {
    let response = await apiClient.get("/hermes/api/v1/countries/1/city-list");
    if (response.status == 200) {
      let cities = response.data.data.data.map((e) => new City(e));
      return cities;
    } else {
      return [];
    }
  }
  static async submitOrder(data) {
    let response = await apiClient.post("/hermes/api/v1/orders", data);
    if (response.status == 200) {
      return true;
    } else {
      return false;
    }
  }
}
