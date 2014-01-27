define(['app', 'apps/about/show/show_view'], function (ContactManager, View) {
    return{
        showAbout: function () {
            var aboutView = new View.Message();
            ContactManager.mainRegion.show(aboutView);
        }
    };
});