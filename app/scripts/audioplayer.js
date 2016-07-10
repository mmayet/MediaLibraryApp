var jsmediatags = window.jsmediatags;
var url = "https://students.ics.uci.edu/~mmayet/music/app/audio/";
var suburl = "/~mmayet/music/app/";
var albums = ["Shamāʾil Al-Nabī ﷺ","The Soliloquy of The Full Moon","Qaṣāʾid Shaykh Ṣāliḥ al-Jaʿfarī","Week of Our Beloved ﷺ","Gardens of The Righteous F15","Gardens of The Righteous W16","My Poems"];

for (var i=0; i < albums.length; i++) {
    NProgress.start();
    var currAlbum = albums[i];
    //$(".mdl-layout__content").append(getSectionDetails(currAlbum, i));
    $(getSectionDetails(currAlbum,i)).insertBefore(".mdl-mega-footer");
    $("#nav-bar").append(getNavBarLinks(currAlbum, i));
    getAllTracks(albums[i]);
}

function getAllTracks(thisAlbum) {
    var currAlbumText = simplifyText(thisAlbum);
    var fileext = [".mp3", ".m4a"];
    $.ajax({
        url: url+thisAlbum,
        //async: false,
        success: function (data) {
            //var track = {album: currAlbumText,file:"",tag:""};
            //var tracks = [];
            var j=0;
            $(data).find("a:contains(" + (fileext[0]) + "), a:contains(" + (fileext[1]) + ")").each(function () {
                var filename = url + thisAlbum + "/" + this.href.replace(window.location.host+suburl, "").replace("https://", "");
                getIndvTrack(currAlbumText, filename);
                //track.file = filename;
                //track.tag = getIndvTrack(currAlbumText, filename);
                //tracks[j] = track;
                //j++;
            });
            //console.log(tracks);
        }
    });
}

function getIndvTrack(thisAlbum, name) {
    jsmediatags.read(name, {
        //async: false,
        onSuccess: function(tag) {
            var tags = tag.tags;
            //console.log(tags.artist + " - " + tags.title + ", " + tags.album);
            $("#"+thisAlbum).append(getTrackDetails(tags.title, name));
            if (tags.album == "My Poems") {NProgress.done();}
            //return tags;
        }
    });
}

function sortAndAppend(currAlbumText, name, tag) {

}

function simplifyText(string) {
    return string.replace(/ /g, '').toLowerCase().trim();
}

function getSectionDetails(thisAlbum, i) {
    if (i==0)
        return "<div class='mdl-layout__tab-panel is-active' id='"+simplifyText(thisAlbum)+"Album'><section class='section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp'><div class='mdl-card mdl-cell mdl-cell--12-col'><div class='mdl-card__supporting-text mdl-grid mdl-grid--no-spacing'><h3 class='mdl-cell mdl-cell--12-col' id='"+simplifyText(thisAlbum)+"'>"+thisAlbum+"</h3></div>";
    else
        return           "<div class='mdl-layout__tab-panel' id='"+simplifyText(thisAlbum)+"Album'><section class='section--center mdl-grid mdl-grid--no-spacing mdl-shadow--2dp'><div class='mdl-card mdl-cell mdl-cell--12-col'><div class='mdl-card__supporting-text mdl-grid mdl-grid--no-spacing'><h3 class='mdl-cell mdl-cell--12-col' id='"+simplifyText(thisAlbum)+"'>"+thisAlbum+"</h3></div>";
}

function getTrackDetails(title, name) {
    return "<div class='section__text mdl-cell mdl-cell--10-col-desktop mdl-cell--6-col-tablet mdl-cell--3-col-phone'><h4>"+title+"</h4><audio controls preload='none' class='audioplayer'><source src='"+name+"' type='audio/mpeg'></audio></div>";
}

function getNavBarLinks(thisAlbum, i) {
    return (i==0) ? "<a href='#"+simplifyText(thisAlbum)+"Album' class='mdl-layout__tab is-active' >"+thisAlbum+"</a>" : "<a href='#"+simplifyText(thisAlbum)+"Album' class='mdl-layout__tab'>"+thisAlbum+"</a>";
}