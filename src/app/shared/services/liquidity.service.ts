import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil, mergeMap, map } from 'rxjs/operators';

import { FunderPolicy, GetInfo, LiquidityStore, Node } from '../models/store';

@Injectable({ providedIn: 'root' })
export class LiquidityService implements OnDestroy {
  private serverUrl = 'http://localhost:3030/api';
  private liquidityStore: LiquidityStore = { nodesToCompare: []};
  public nodesListSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public nodesToCompareSubject: BehaviorSubject<any> = new BehaviorSubject(null);
  public funderPolicySubject: BehaviorSubject<FunderPolicy> = new BehaviorSubject({});
  private unSubs: Array<Subject<void>> = [new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject(), new Subject()];

  constructor(private httpClient: HttpClient) { }

  getMyNode() {
    return this.liquidityStore.nodeInfo;
  }

  getNodeInfo() {
    this.httpClient.get<GetInfo>(this.serverUrl + '/getInfo').pipe(takeUntil(this.unSubs[0])).subscribe({
      next: (info) => {      
        this.liquidityStore.nodeInfo = info;
        console.info(this.liquidityStore.nodeInfo);
      }, error: (err) => {
        console.error(err);
      }
    });
  }

  listLQNodes() {
    this.httpClient.get<Node[]>(this.serverUrl + '/listLiquidityNodes').pipe(takeUntil(this.unSubs[1])).subscribe({
      next: (nodes) => {
        const filteredNodes = nodes.filter((node) => {
          if(node.nodeid !== this.liquidityStore.nodeInfo?.id) {
            node.compare = false;
            node.showDetails = false;
            return node;
          } else {
            return;
          }
        });
        this.liquidityStore.nodes = filteredNodes;
        this.nodesListSubject.next(this.liquidityStore.nodes);
        console.info(this.liquidityStore.nodes);
      }, error: (err) => {
        this.nodesListSubject.error(err);
        console.error(err);
      }
    });
  }

  updateCompareNodesList(lqNode: Node) {
    let foundIndex = this.liquidityStore.nodesToCompare?.indexOf(lqNode);
    if(typeof foundIndex === 'undefined') { foundIndex = -1; }
    if (lqNode.compare) {
      this.liquidityStore.nodesToCompare?.push(lqNode);
    } else if (!lqNode.compare && foundIndex > -1) {
      this.liquidityStore.nodesToCompare?.splice(foundIndex, 1);
    }
    this.nodesToCompareSubject.next(this.liquidityStore.nodesToCompare);
  }

  openChannel(nodeUri: string, compactLease: string, requestAmount: number, feeRate: number, localAmount: number) {
    return this.httpClient.post(this.serverUrl + '/connectPeer', { id: nodeUri }).pipe(takeUntil(this.unSubs[2]),
      mergeMap((connectPeerRes: any) => this.httpClient.post(this.serverUrl + '/fundChannel', { id: connectPeerRes.id, compactLease: compactLease, requestAmount: requestAmount, feeRate: feeRate, amount: localAmount })));
  }

  funderUpdatePolicy() {
    this.httpClient.post(this.serverUrl + '/funderUpdate', { })
    .pipe(takeUntil(this.unSubs[3]))
    .subscribe(funderPolicy => {
      this.liquidityStore.funderPolicy = funderPolicy;
      this.funderPolicySubject.next(funderPolicy);
    });
  }

  updateStore(value: any, field: string) {
    if (field === 'FU') {
      this.liquidityStore.funderPolicy = value;
      this.funderPolicySubject.next(this.liquidityStore.funderPolicy || {});
    }
  }

  updatePolicy(policy?: any, policyMod?: any, leaseFeeBaseMsat?: any, leaseFeeBasis?: any, channelFeeMaxBaseMsat?: any, channelFeeMaxProportional?: any) {
    return this.httpClient.post(this.serverUrl + '/funderUpdate', { policy: policy, policyMod: policyMod, leaseFeeBaseMsat: leaseFeeBaseMsat, leaseFeeBasis: leaseFeeBasis, channelFeeMaxBaseMsat: channelFeeMaxBaseMsat, channelFeeMaxProportional: channelFeeMaxProportional });
  }

  ngOnDestroy() {
    this.nodesToCompareSubject.next(null);
    this.nodesToCompareSubject.complete();
    this.nodesListSubject.next(null);
    this.nodesListSubject.complete();
    this.funderPolicySubject.next({});
    this.funderPolicySubject.complete();
    this.unSubs.forEach((completeSub) => {
      completeSub.next();
      completeSub.complete();
    });
  }

}
