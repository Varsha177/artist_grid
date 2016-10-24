import {Mongo} from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { HTTP } from 'meteor/http';


export const Artists = new Mongo.Collection('artists');

if(Meteor.isServer) {
    let URL = (artistName) => `http://api-3283.iheart.com/api/v1/catalog/searchAll?keywords=${artistName}&queryTrack=false&queryBundle=false&queryArtist=true&queryStation=false&queryFeaturedStation=false&queryTalkShow=false&queryTalkTheme=false&queryKeyword=false&countryCode=US`;
    let imageURL = (artistId) => `http://iscale.iheart.com/catalog/artist/${artistId}?ops=fit(250,0)`;

    Meteor.publish('artistsSearch', function(artistName) {
        try {
            var result = HTTP.get(URL(artistName));
            if(result.data.totalArtists <= 0) {
                this.ready();
                return;
            }

            var artists = result.data.artists.slice(0, 6)
                .map((artist) => {
                    return {
                        name: artist.artistName,
                        image: imageURL(artist.artistId)
                    }
                });

            this.added('artists', artistName, {artists: artists});
        }
        catch(error) {
            console.log(error);
        }
    });
}


Artists.search = function(name) {
    return Artists.findOne({
        _id: name
    });
};
