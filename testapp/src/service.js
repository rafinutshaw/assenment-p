import { apiClient } from "./axios";
import { Store } from "./models/store";
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
    let response = await apiClient.get("/v1/cities/1/zone-list");
  }
  static async getAreaList() {
    let response = await apiClient.get("/v1/zones/298/area-list");
  }
  static async getCityList() {
    let response = await apiClient.get("/v1/countries/1/city-list");
  }
}
