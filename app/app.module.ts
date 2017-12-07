import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutes } from './routes'
import { NavBarComponent } from './nav/index'
import { Error404Component } from './errors/index'

import { DurationPipe } from './events/shared/index'

import { 
    TOASTR_TOKEN, 
    IToastr, 
    CollapsibleWellComponent, 
    JQ_TOKEN,
    SimpleModalComponent,
    ModalTriggerDirective } from './common/index'

import { AuthService } from './user/auth.service'

import { 
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventService,
    EventDetailsComponent,
    CreateEventComponent,
    EventRouteActivator,
    CreateSessionComponent,
    SessionListComponent } from './events/index'

declare let toastr: IToastr
declare let jQuery: Object

@NgModule({
    imports: [
        BrowserModule,
        FormsModule, 
        ReactiveFormsModule,       
        RouterModule.forRoot(AppRoutes, { enableTracing:true })
    ],
    declarations: [
        Error404Component,
        EventsAppComponent,
        EventsListComponent,
        EventThumbnailComponent,
        NavBarComponent,
        EventDetailsComponent,
        CreateEventComponent,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe,
        SimpleModalComponent,
        ModalTriggerDirective 
    ],
    providers: [
        EventService, 
        EventRouteActivator,
        { provide: AuthService, useClass: AuthService },
        { provide: TOASTR_TOKEN, useValue: toastr }, 
        { provide: JQ_TOKEN, useValue: jQuery },
        { provide: 'canDeactivateCreateEvent', useValue: checkDirtyState }
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {

}

function checkDirtyState(component:CreateEventComponent) {
    if (component.isDirty)
        return window.confirm('You haven\'t saved this event, do you really want to cancel?')
    
    return true
}