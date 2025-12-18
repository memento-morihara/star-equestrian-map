import { DI } from "@aurelia/kernel";
import {
	GeometryCollection,
	Map as Maptalks,
	Marker,
	projection,
	TileLayer,
	VectorLayer,
} from "maptalks-gl";
import itemInfo from "../data/info.json";

type MarkerData = {
	id: string;
	item: string;
	description: string;
	region: string;
	coordinates: number[];
};

export class MapService {
	private map: Maptalks;
	private markers: GeometryCollection;
	private markerLayer: VectorLayer;
	private filteredMarkers: GeometryCollection;

	init(container: HTMLElement) {
		const tileLayer = new TileLayer("tiles", {
			urlTemplate: "/assets/tiles/{z}/{x}/{y}.webp",
			attribution: "Foxie Ventures",
			maxZoom: 6,
			maxAvailableZoom: 5,
		});

		this.map = new Maptalks(container, {
			spatialReference: {
				projection: projection.IDENTITY,
			},
			zoom: 1,
			center: [0, 0],
			maxZoom: 6,
			baseLayer: tileLayer,
		});

		this.markerLayer = new VectorLayer("markers").addTo(this.map);

		this.markers = new GeometryCollection([], {
			visible: true,
			editable: true,
			draggable: false,
		});
	}

	addMarker(data: MarkerData) {
		const itemData = itemInfo[data.item];

		return new Marker(data.coordinates, {
			properties: {
				item: data.item,
				region: data.region,
				id: data.id,
				description: data.description,
				...itemData,
			},
			symbol: {
				markerFile: itemData.icon,
				markerHeight: 32,
				markerWidth: 32,
			},
		});
	}

	addMarkers(data: MarkerData[]) {
		const newMarkers = [];
		for (const marker of data) {
			newMarkers.push(this.addMarker(marker));
		}
		this.markers.setGeometries([
			...this.markers.getGeometries(),
			...newMarkers,
		]);
		this.filteredMarkers = new GeometryCollection(this.markers.getGeometries());
		this.filteredMarkers.addTo(this.markerLayer);
	}
}

export const IMapService = DI.createInterface<IMapService>(
	"IMapService",
	(it) => it.singleton(MapService),
);

export type IMapService = MapService;
