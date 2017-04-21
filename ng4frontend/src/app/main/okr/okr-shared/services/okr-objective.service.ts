import { Injectable } from '@angular/core';


import { Http,Response, Headers,RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


import {MY_CONFIG} from '../../../../app-config';

import {Objectiveclass} from '../classes/objective-class';
import {Goalclass} from '../classes/goal-class';


@Injectable()
export class SettingObjectiveService {

    private getallAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.objectiveGetAllUrl;
    private basicAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.objectiveGetAllUrl;

    private creatAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.objectiveCreateUrl;
    private operateAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.objectiveOperateUrl;

    private betweenUsersAndObjectivesRelationshipAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.userObjectiveOperateUrl;
    private betweenTeamsAndObjectivesRelationshipAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.teamsObjectiveOperateUrl;
    private betweenObjectivesAndGoalsRelationshipAPI = MY_CONFIG.apiEndpoint + MY_CONFIG.apiPath +  MY_CONFIG.goalObjectiveOperateUrl;


    private headers = new Headers({ 'Content-Type': 'application/json' });

    private tempdata : any;

    constructor(private http: Http) { }



    private extractDataObservable(res: Response) {
        let body=null;
        console.log(res.status);
        if(res.status < 200 || res.status >= 300) {
            body=res;
            throw new Error('This request has failed ' + res.status);
        }
        // If everything went fine, return the response
        else {
            body = res.json()  ;
        }
        return body;
    }

    private handleErrorObservable (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }



    getAll(): Observable<Objectiveclass[]> {
        return this.http.get(this.getallAPI)
        // .map(res => <DatabasesClass[]> res.json().data)
            .map(res => res.json())
            // .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleErrorObservable);
    }


    get(objective: Objectiveclass): Observable<Objectiveclass>{

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.operateAPI}/${objective.objective_id}`;
        return this.http.get(url)
        // .map(res => <DatabasesClass[]> res.json().data)
            .map(res => res.json())
            // .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleErrorObservable);

    }
    getByObjevtiveId(objectiveId: number): Observable<Objectiveclass>{

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.operateAPI}/${objectiveId}`;
        return this.http.get(this.getallAPI)
        // .map(res => <DatabasesClass[]> res.json().data)
            .map(res => res.json())
            // .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleErrorObservable);

    }


    delete( teamlObjective: Objectiveclass): Observable<Objectiveclass> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        const url = `${this.operateAPI}/${teamlObjective.objective_id}`;

        return this.http.delete(url, options)
            .map(res => res.json())
            .catch(this.handleErrorObservable);
    }

    update(objective: Objectiveclass): Observable<Objectiveclass> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let httpBody = JSON.stringify(objective)

        const url = `${this.operateAPI}/${objective.objective_id}`;
        return this.http
            .put(url,httpBody , options)
            .map(res => res.json())
            .catch(this.handleErrorObservable)
    }



    addNew(objective_description: string, objective_name: string,objective_status:string,objective_progress_status:number,) : Observable<Objectiveclass>  {

        let httpBody = JSON.stringify({ objective_description : objective_description,objective_status:objective_status,objective_name:objective_name,objective_progress_status: objective_progress_status});
        // let body2 = "{time_frame_description:Team_description,time_frame_start:Team_start,time_frame_end :Team_end}";

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        //console.log('Post message body: '+httpBody);
        return this.http.post(this.creatAPI,httpBody, {headers: this.headers})
        //.map(this.extractDataObservable)
            .map(res => res.json())
            .catch(this.handleErrorObservable)

    }

    addNewByObjective(newOjective:Objectiveclass) : Observable<Objectiveclass>  {

        let httpBody = JSON.stringify({ objective_description : newOjective.objective_description, objective_status:newOjective.objective_status,objective_name: newOjective.objective_name,objective_progress_status: newOjective.objective_progress_status});

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        //console.log('Post message body: '+httpBody);
        return this.http.post(this.creatAPI,httpBody, {headers: this.headers})
        //.map(this.extractDataObservable)
            .map(res => res.json())
            .catch(this.handleErrorObservable)

    }


    getByUserId(userId: number): Observable<Objectiveclass[]>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.betweenUsersAndObjectivesRelationshipAPI}/get_by_user_id/${userId}`;
        return this.http.get(url)
        // .map(res => <DatabasesClass[]> res.json().data)
            .map(res => res.json())
            // .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleErrorObservable);
    }


    getUsersTeamByUserId(userId: number): Observable<Objectiveclass[]>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.basicAPI}/get_users_team_objectives/${userId}`;
        return this.http.get(url)
        // .map(res => <DatabasesClass[]> res.json().data)
            .map(res => res.json())
            // .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleErrorObservable);
    }


    getByTeamId(teamId: any): Observable<Objectiveclass[]>{

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.betweenTeamsAndObjectivesRelationshipAPI}/get_by_team_id/${teamId}`;
        return this.http.get(url)
        // .map(res => <DatabasesClass[]> res.json().data)
            .map(res => res.json())
            // .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleErrorObservable);
    }


    getByTeamIdNTimeFrame(teamId: any, TimeFrameId:any): Observable<Objectiveclass[]>{

        const httpBody = JSON.stringify({team_id: teamId, time_frame_id: TimeFrameId });
        const url = `${this.basicAPI}/get_by_team_id_timeFrame`;
        return this.http.post(url, httpBody, this.headers)
        // .map(res => <DatabasesClass[]> res.json().data)
            .map(res => res.json())
            // .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleErrorObservable);
    }


    getByGoalId(objectiveId: number): Observable<Objectiveclass[]>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.operateAPI}/${objectiveId}`;
        return this.http.get(this.getallAPI)
            .map(res => res.json())
            .catch(this.handleErrorObservable);
    }

    getByKeyResultId(objectiveId: number): Observable<Objectiveclass>{

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.operateAPI}/${objectiveId}`;
        return this.http.get(this.getallAPI)
        // .map(res => <DatabasesClass[]> res.json().data)
            .map(res => res.json())
            // .do(data => console.log(data)) // eyeball results in the console
            .catch(this.handleErrorObservable);

    }


    setTeamObjectives(objective: Objectiveclass,teamid:any){
        var info={objective_id:objective.objective_id, team_id : teamid};
        let httpBody = JSON.stringify(info);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });

        const url = `${this.betweenTeamsAndObjectivesRelationshipAPI}/create`;
        return this.http.post(url,httpBody, {headers: this.headers})
            .map(res => res.json())
            .catch(this.handleErrorObservable)

    }

    setGoalsObjectives(objective:Objectiveclass,goalArray:  any){

        // let body2 = "{time_frame_description:Team_description,time_frame_start:Team_start,time_frame_end :Team_end}";
        var i=0;
        var tempMemberArray=[];
        for(i=0;i<goalArray.length;i++){

            var info={objective_id:objective.objective_id,goal_id:goalArray[i]};

            tempMemberArray.push(info);
        }


        let httpBody = JSON.stringify({data:tempMemberArray });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });


        const url = `${this.betweenObjectivesAndGoalsRelationshipAPI}/batch_create`;


        //console.log('Post message body: '+httpBody);
        return this.http.post(url,httpBody, {headers: this.headers})
        //.map(this.extractDataObservable)
            .map(res => res.json())
            .catch(this.handleErrorObservable)

    }


    updateGoalsObjectives(objective:Objectiveclass, currentGoalsArray:any){
        var i=0;
        var tempMemberArray=[];
        for(i=0;i<currentGoalsArray.length;i++){

            var info=currentGoalsArray[i];
            tempMemberArray.push(info);
        }

        let httpBody = JSON.stringify({data:{objective_id:objective.objective_id,new_members: tempMemberArray } });

        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url = `${this.betweenObjectivesAndGoalsRelationshipAPI}/update_members`;

        return this.http.post(url,httpBody, {headers: this.headers})
        //.map(this.extractDataObservable)
            .map(res => res.json())
            .catch(this.handleErrorObservable)

    }



}
