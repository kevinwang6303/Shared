import {
  Component,
  ComponentRef,
  ComponentFactoryResolver,
  AfterViewInit,
  ViewChild,
  Input,
  Output,
  EventEmitter,
  AfterContentInit,
  ReflectiveInjector
} from '@angular/core';
import { ViewContainerDirective } from '../view-container.directive';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { PopUpService } from '../pop-up.service';
import { PopUpModel, PopUpConfig, PopUpRef } from '../pop-up.model';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AutoDestroy } from '@shared/base/auto.destroy';
import { animateFactory } from '../../../animation/index';

@Component({
  selector: 'app-pop-up-item',
  templateUrl: './pop-up-item.component.html',
  styleUrls: ['./pop-up-item.component.scss'],
  animations: [
    // animateFactory(`300ms cubic-bezier(.17,.67,.27,1.26)`)
    animateFactory('300ms cubic-bezier(0.25, 0.8, 0.25, 1)')
  ]
})
export class PopUpItemComponent extends AutoDestroy implements AfterContentInit {

  @Input('item') item: PopUpModel;
  @Input('index') index: number;
  @Output('deleteCallback') deleteCallback: EventEmitter<any> = new EventEmitter();

  windowZindex = 999;
  addClass = {
    panelClass: 'window',
    backdropClass: 'hasBackdrop'
  };
  addStyle = {};
  animateName = 'slideInDown';
  title: SafeHtml;
  private componentRef: ComponentRef<PopUpRef>;
  private sendData: any;
  refInjector;
  @ViewChild(ViewContainerDirective) view: ViewContainerDirective;

  constructor(
    private _cfr: ComponentFactoryResolver,
    private _pop: PopUpService,
    private _sanitizer: DomSanitizer) { super(); }

  ngAfterContentInit() {
    this.handelConfig(this.item.config);
    this.loadComponent(this.item);
  }

  // All use this function to close dialog in the component.
  close() {
    this.deleteCallback.emit({ index: this.index, data: this.sendData });
  }

  // load Dynamin component
  private loadComponent(cObject: PopUpModel) {
    const viewContainerRef = this.view.viewContainerRef;

    viewContainerRef.clear();
    if (this.componentRef) { this.componentRef.destroy(); }

    if (cObject) {
      // if lazyLoadModule must be assign moduleName
      if (cObject.config) {
        // if this component is from lazyLoad module and has set Module
        if (cObject.config.moduleName) {
          const resolve = this._pop.getModuleFacory(cObject.config.moduleName);
          if (resolve) {
            const childComponent =
              resolve.factory.resolveComponentFactory(cObject.component);
            this.refInjector = ReflectiveInjector
              .resolveAndCreate([{ provide: cObject.component, useValue: cObject.component }], resolve.injector);
            this.componentRef = viewContainerRef.createComponent(childComponent, 0, this.refInjector);
          }
        } else {
          const componentFactory = this._cfr.resolveComponentFactory(cObject.component);
          this.componentRef = viewContainerRef.createComponent(componentFactory);
        }
        // send data to component
        if (cObject.config.data) {
          (<PopUpRef>this.componentRef.instance).popupInputData = cObject.config.data;
        }
      }
      // get title from component
      this.title = this._sanitizer.bypassSecurityTrustHtml(
        cObject.config.title ?
          cObject.config.title : this.componentRef.instance.popupTitle);

      // when data send back, close this dialog
      this.componentRef.instance.popupOutputSender
        .takeUntil(this._destroy$)
        .subscribe((data: any) => {
          this.sendData = data;
          this.close();
        });
    }
  }
  // handel the pop-up style and class
  private handelConfig(config: PopUpConfig) {
    if (config) {
      if (config.hasBackdrop === false) {
        this.addClass.backdropClass = '';
      } else {
        this.addClass.backdropClass = config.backdropClass ? config.backdropClass : 'hasBackdrop';
      }

      this.addClass.panelClass = config.panelClass ? config.panelClass : 'window';

      this.addStyle = {
        width: config.width,
        height: config.height,
        marginTop: config.marginTop
      };
      this.animateName = config.animateName ? config.animateName : this.animateName;
    }
  }
}
