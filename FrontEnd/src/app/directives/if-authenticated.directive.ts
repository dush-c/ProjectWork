import {Directive, OnDestroy, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {AuthService} from "../services/auth.service";

@Directive({
  selector: '[IfAuthenticated]'
})
export class IfAuthenticatedDirective implements OnInit, OnDestroy {

  protected destroyed$ = new Subject<void>();

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    protected authSrv: AuthService
  ) {}

  ngOnInit() {
    this.authSrv.currentUser$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((_) => {
        this.updateView();
      });
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private updateView() {
    if (this.authSrv.isLoggedIn()) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
