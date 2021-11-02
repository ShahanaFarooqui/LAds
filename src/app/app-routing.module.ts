import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LiquidityOffersComponent } from './liquidity-offers/liquidity-offers.component';
import { LiquidityOfferDetailComponent } from './liquidity-offer-detail/liquidity-offer-detail.component';
import { LiquidityAdvertisementComponent } from './liquidity-advertisement/liquidity-advertisement.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'lease' },
  { path: 'lease', component: LiquidityOffersComponent },
  { path: 'node/:nodeid', component: LiquidityOfferDetailComponent },
  { path: 'adv', component: LiquidityAdvertisementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
