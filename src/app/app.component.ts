import { Component } from "@angular/core";
import { Feature } from "./list/CheckListComponent";
const caniuse = require("caniuse-api");

interface Project extends Feature {
  features: Feature[];
  platforms: Feature[];
}

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  isSupported: boolean;
  err: string;

  projects: Project[];
  foundFeatures: string[];
  foundPlatforms: string[];
  private file: File;

  constructor() {
    this.projects = this.load() || []; 
  }

  searchFeatures(filter: string) {
    this.foundFeatures = caniuse.find(filter);
  }

  searchPlatforms(filter: string) {
    this.foundPlatforms = caniuse.getLatestStableBrowsers().filter(p => p.indexOf(filter)>=0);
  }

project: Project;
  changed() {
    const project = this.project = this.projects.filter(p => p.enabled)[0];
    if (project) {
      if (!project.features) {
        project.features = [];
        project.platforms = [];
      }
      const features = project.features.filter(f => f.enabled);
      const platforms = project.platforms.filter(p => p.enabled).map(p => p.name).join(',');
      this.isSupported = features.length ? true : undefined; 
      if (this.isSupported) {
        try {
          features.forEach(feature => {
            feature.supported = caniuse.isSupported(feature.name, platforms);
            this.isSupported = this.isSupported && feature.supported;
          });
          this.err = undefined;
        } catch (err) {
          this.err = err;
        }
      }
    }
    this.save();
  }

  load() {
    return JSON.parse(localStorage.getItem('projects'));
  } 

  save() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  } 

  export() {
    const jsonState = JSON.stringify(this.projects, null, 2);
    const stateBlob = new Blob([jsonState], {type: 'application/json'});
    const fileName = 'caniuseonmyprojects.json';
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(stateBlob, fileName);
    } else {
      const elem = window.document.createElement('a');
      elem.href = window.URL.createObjectURL(stateBlob);
      elem.download = fileName;
      document.body.appendChild(elem);
      elem.click();
      document.body.removeChild(elem);
    }
  }

  import() {
    const file = (<any>document.querySelector('input[type="file"]')).files[0];
    const memoryFileReader = new FileReader();
    memoryFileReader.onloadend = (e: Event) => {
      const fileData = (<any>e.target).result;
      this.projects = JSON.parse(fileData);
    };
    memoryFileReader.readAsText(file);
  }
}
