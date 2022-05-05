import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbProgressbarModule, NgbAccordionModule, NgbModalModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiquidityOffersComponent } from './liquidity-offers/liquidity-offers.component';
import { LiquidityOfferDetailComponent } from './liquidity-offer-detail/liquidity-offer-detail.component';
import { LiquidityOfferNodeCompareComponent } from './liquidity-offer-node-compare/liquidity-offer-node-compare.component';
import { LiquidityAdvertisementComponent } from './liquidity-advertisement/liquidity-advertisement.component';
import { OpenChannelModalComponent } from './open-channel-modal/open-channel-modal.component';
import { UpdateFundingPolicyComponent } from './update-funding-policy/update-funding-policy.component';

import { AutoFocusDirective } from './shared/directive/auto-focus.directive';
import { SortableHeader } from './shared/directive/sortable.directive';

@NgModule({
  declarations: [
    AppComponent,
    LiquidityOffersComponent,
    LiquidityOfferDetailComponent,
    LiquidityAdvertisementComponent,
    LiquidityOfferNodeCompareComponent,
    OpenChannelModalComponent,
    UpdateFundingPolicyComponent,
    AutoFocusDirective,
    SortableHeader
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbProgressbarModule,
    NgbAccordionModule,
    NgbModalModule,
    NgbTypeaheadModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
