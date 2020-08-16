import { Component, Input, OnInit } from "@angular/core";
declare const DocsAPI: any;

@Component({
  selector: "onlyoffice",
  styles: [],
  template: `
    <div id="onlyofficeEditor"></div>
  `,
})
export class NgxOnlyOfficeComponent implements OnInit {
  @Input("config") public config: {script: string, editorConfig: any};
  public editor: any;
  public ngOnInit() {
    this.loadScript(this.config.script).then((i) => {
      this.createEditor();
    // tslint:disable-next-line: no-console
    }).catch((e) => console.error(e));
  }

  public ngOnChanges() {
    this.editor.destroyEditor();
    this.createEditor();
  }

  private createEditor() {
    this.editor = new DocsAPI.DocEditor("onlyofficeEditor", this.config.editorConfig);
  }

  public loadScript(src) {
    return new Promise((resolve, reject) => {
        const script: any = document.createElement("script");
        script.type = "text/javascript";
        script.src = src;
        if (script.readyState) {
            script.onreadystatechange = () => {
                if (script.readyState === "loaded" || script.readyState === "complete") {
                    script.onreadystatechange = null;
                    resolve({script: name, loaded: true, status: "Loaded"});
                }
            };
        } else {
            script.onload = () => {
                resolve({script: name, loaded: true, status: "Loaded"});
            };
        }
        script.onerror = (error: any) => resolve({script: name, loaded: false, status: "Loaded"});
        document.getElementsByTagName("head")[0].appendChild(script);
    });
  }
}
