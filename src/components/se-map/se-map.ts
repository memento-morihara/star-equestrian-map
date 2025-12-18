import { resolve } from '@aurelia/kernel';
import { bindable } from 'aurelia';
import data from "../../data/data.json";
import { IMapService } from '../../services/MapService';

export class SEMap {
  @bindable private mapContainer: HTMLElement;
  private map = resolve(IMapService);
  
  attached() {
    this.map.init(this.mapContainer);

    this.map.addMarkers(data.map(item => ({
      id: item.id,
      item: item.name.toLowerCase().split(" ").join("-"),
      coordinates: [item.lng * 4, item.lat * 4],
      region: item?.region,
      description: item.description,
    })));
  }
}
