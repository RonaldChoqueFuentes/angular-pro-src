import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '../../../store';
import { SongsService } from '../../services/songs.service'
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

@Component({
    selector:'songs-listened',
    template:`
    <div class="songs">
    <div *ngFor="let item of listened$ | async">
    {{ item.artist }}
    {{ item.track }}
    </div>
  </div>
    `
})

export class SongsListenedComponent implements OnInit, OnDestroy{
    
    listened$: Observable<any[]>;

    constructor(private store:Store,
                private songsService:SongsService){}
    
    ngOnInit(){
        this.listened$ = this.store.select('playlist').filter(Boolean)
        .map(playlist => playlist.filter(track => track.listened));        
    }

    ngOnDestroy(){
    }
}