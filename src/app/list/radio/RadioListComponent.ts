import { Component, Output, Input, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { Feature } from '../Feature';

@Component({
  selector: 'radiolist',
  templateUrl: 'RadioListComponent.html',
  styleUrls: [ 'RadioListComponent.scss' ]
})
export class RadioListComponent implements OnInit {

  @Input() id: string;
  @Input() label: string;
  @Input() placeholder: string;
  @Input() features: Feature[] = [];
  @Output() featuresChange = new EventEmitter();
  
  @Output() readonly change = new EventEmitter();

  canAdd: boolean;
  selectedFeature: string;
  featureFilter: string = '';
  featureSelected: string;

  ngOnInit() {
    this.changed();
  }

  add() {
    this.features.push({name: this.featureFilter});
    this.featureSelected = this.featureFilter;
    this.selectFeature();
    this.featureFilter = '';
    this.changed();
  }

  remove(feature) {
    this.features.splice(this.features.indexOf(feature), 1);
    this.selectFeature();
    this.changed();
  }

  selectFeature() {
    this.canAdd = !Boolean(this.features.find(f => f.name === this.featureFilter));
  }

  changed() {
    this.features.forEach(f => {
      f.enabled = f.name === this.featureSelected;
    });
    this.change.emit(this.features);
  }
}
