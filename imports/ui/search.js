import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Artists } from '../api/search.js';

import './search.html';

Template.search.onCreated(function() {
    this.searchString = new ReactiveVar('');

    this.autorun(() => {
        if(this.searchString.get() !== null) {
            console.log('cool', this.searchString.get());
            this.subscribe('artistsSearch', this.searchString.get());
        }
    })
})


Template.search.events({
    'submit .iheart-search'(event) {
        event.preventDefault();
        const target = event.target;
        const text = target.text.value;

        let instance = Template.instance();
        instance.searchString.set(text);

        target.text.value = '';
        $('.landing').css({display: 'none'});
        $('.container').css({display: 'flex'});
    }
});


Template.search.helpers({
    artists: function() {
        return Artists.search(Template.instance().searchString.get());
    }
})
