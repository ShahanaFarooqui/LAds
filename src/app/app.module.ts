import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiquidityOffersComponent } from './liquidity-offers/liquidity-offers.component';
import { LiquidityOfferDetailComponent } from './liquidity-offer-detail/liquidity-offer-detail.component';
import { LiquidityAdvertisementComponent } from './liquidity-advertisement/liquidity-advertisement.component';
import { CompareLadsComponent } from './compare-lads/compare-lads.component';
import { OpenChannelModalComponent } from './open-channel-modal/open-channel-modal.component';
import { AutoFocusDirective } from './shared/directive/auto-focus.directive';
import { UpdateFundingPolicyComponent } from './update-funding-policy/update-funding-policy.component';

@NgModule({
  declarations: [
    AppComponent,
    LiquidityOffersComponent,
    LiquidityOfferDetailComponent,
    LiquidityAdvertisementComponent,
    CompareLadsComponent,
    OpenChannelModalComponent,
    AutoFocusDirective,
    UpdateFundingPolicyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AccordionModule,
    ModalModule.forRoot(),
    ProgressbarModule.forRoot(),
    BsDropdownModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
