import { Component, Output, Input, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { Feature } from '../Feature';

@Component({
  selector: 'checklist',
  templateUrl: 'CheckListComponent.html',
  styleUrls: [ 'CheckListComponent.scss' ]
})
export class CheckListComponent implements OnInit {

  @Input() support: boolean;
  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() foundFeatures: string[];
  
  @Output() readonly search = new EventEmitter();
  @Output() readonly change = new EventEmitter();

  canAdd: boolean;
  @Input() features: Feature[] = [];
  @Output() featuresChange = new EventEmitter();
  selectedFeature: string;
  featureFilter: string = '';
  featureSelected: string;

  ngOnInit() {
    this.searchFeatures();
    this.changed();
  }

  ngOnChanges(changes) {
    if (changes.foundFeatures) {
      this.selectedFeature = this.foundFeatures && this.foundFeatures.length > 0 ? this.foundFeatures[0] : null;
      this.selectFeature();
    }
  }

  add() {
    this.features.push({name: this.selectedFeature, supported: this.support, enabled: true});
    this.selectFeature();
    this.featureFilter = '';
    this.changed();
  }

  remove(feature) {
    this.features.splice(this.features.indexOf(feature), 1);
    this.selectFeature();
    this.changed();
  }

 searchFeatures() {
    this.search.emit(this.featureFilter);
  }

  selectFeature() {
    this.canAdd = this.selectedFeature && !Boolean(this.features.find(f => f.name === this.selectedFeature));
  }

  changed() {
    this.change.emit(this.features);
  }
}
