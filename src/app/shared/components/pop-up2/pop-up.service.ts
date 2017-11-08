import { Injectable, TemplateRef, Type, ComponentFactoryResolver, Injector } from '@angular/core';
import { PopUpModel, PopUpCallback, PopUpRef, PopUpConfig } from './pop-up.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class PopUpService {

  private popupCallback: PopUpCallback[] = [];
  constructor() { }

  dataChanged = new Subject<PopUpModel>();

  moduleFactorys: { moduleName: string, factory: ComponentFactoryResolver, injector: Injector }[] = [];

  open(component: Type<PopUpRef>, config?: PopUpConfig) {
    this.dataChanged.next({ component: component, config: config });
    const callBack = new PopUpCallback();
    this.popupCallback.push(callBack);
    // console.log(this.popupCallback);
    return callBack;
  }

  handelCallBack(index: number, data?: any) {
    this.popupCallback[index]._afterClosed(data);
    this.popupCallback.splice(index, 1);
    // console.log(this.popupCallback);
  }

  pushModuleFactory(moduleName: string, factory: ComponentFactoryResolver, injector: Injector) {
    this.moduleFactorys.push({
      moduleName: moduleName,
      factory: factory,
      injector: injector
    });
  }

  getModuleFacory(moduleName: string) {
    return this.moduleFactorys.find((f) => {
      return f.moduleName === moduleName;
    });
  }

}
