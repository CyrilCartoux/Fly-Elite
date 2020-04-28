import { NgForm } from '@angular/forms';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<any>(null);
  uid;

  constructor() { }

  signUp(form: NgForm) {
    const email = form.value.email;
    const nom = form.value.nom;
    const prenom = form.value.prenom;

    firebase.auth().createUserWithEmailAndPassword(form.value.email, form.value.password)
      .then(credentials => {
        this.uid = credentials.user.uid;
        firebase.database().ref('users').child(this.uid).set({
          email: email,
          nom: nom,
          prenom: prenom
        });
        this.user.next(this.uid);
      }).catch(error => {
        alert(error.message);
      });
  }

  signIn(form: NgForm) {
    firebase.auth().signInWithEmailAndPassword(form.value.email, form.value.password)
      .then(credentials => {
        this.uid = credentials.user.uid;
        this.user.next(this.uid);
      }).catch(error => {
        console.log(error.message);
        alert(error.message);
      });
  }
}
