import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  ComponentRef,
} from '@angular/core';
import { ModalComponent } from './../components/modal/modal.component';
@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private componentRef?: ComponentRef<ModalComponent> | null;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}
  openModal(title: string, message?: string, content?: any): Promise<void> {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
    this.componentRef = componentFactory.create(this.injector);
    this.componentRef.instance.title = title;
    this.componentRef.instance.message = message;
    this.componentRef.instance.content = content;

    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as any)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    return new Promise((resolve, reject) => {
      this.componentRef?.instance.confirm.subscribe(() => {
        this.closeModal();
        resolve();
      });
      this.componentRef?.instance.cancel.subscribe(() => {
        this.closeModal();
        reject();
      });
    });
  }

  private closeModal(): void {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }
}
