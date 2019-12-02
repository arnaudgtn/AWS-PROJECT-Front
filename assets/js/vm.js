var ViewModel = null;

var viewModel = function () {
    var self = this;

    self.users = ko.observableArray([]);

    self.name = ko.observable('');
    self.age = ko.observable('');
    self.gender = ko.observable(0);
    self.job = ko.observable('');

    self.displayAddForm = ko.observable(false);

    self.canSend = ko.computed(function () {
        return self.name() != '' && self.job() != '' && self.age() != '';
    }, self);

    self.showAddForm = function () {
        self.displayAddForm(true);
    };
    self.hideAddForm = function () {
        self.displayAddForm(false);
    };

    self.clearForm = function () {
        self.name('');
        self.age('');
        self.gender(0);
        self.job('');
    };

    self.reloadData = function () {

        var users = [
            {
                Id: 1,
                Name: 'Issarni',
                Age: '50',
                Gender: 0,
                Job: 'Dev'
            },
            {
                Id: 2,
                Name: 'Guillotin',
                Age: '23',
                Gender: 0,
                Job: 'Dev'
            },
            {
                Id: 3,
                Name: 'Clara',
                Age: '26',
                Gender: 1,
                Job: 'Teacher'
            }
        ];

        ko.mapping.fromJS(users, {}, self.users);

        // $.get('', function (data) {
        //     if (data.Users != null) {
        //         ko.mapping.fromJS(data.Users, {}, self.users);
        //     }
        // });
    };

    self.sendAddForm = function () {
        if (!self.canSend()) {
            return;
        }

        var model = {
            Name: self.name(),
            Age: self.age(),
            Gender: self.gender(),
            Job: self.job()
        };

        model.Id = 1;
        self.users.push(model);

        self.clearForm();

        // $.ajax({
        //     type: "POST",
        //     url: "",
        //     success: function (data) {
        //         if (data == "OK") {
        //             window.location.href = '/Request';
        //         } else {
        //             //ERROR
        //             //toastr.error('Une erreur est survenue au chargement des aides.', data);
        //         }
        //     },
        //     data: model
        // });
    };

    self.removeUser = function (data) {
        var id = data.Id();

        self.users.remove(function(user) {
            return user.Id() == id;
        });

        // $.ajax({
        //     type: "POST",
        //     url: "",
        //     success: function (data) {
        //         if (data == "OK") {
        //             window.location.href = '/Request';
        //         } else {
        //             //ERROR
        //             //toastr.error('Une erreur est survenue au chargement des aides.', data);
        //         }
        //     },
        //     data: model
        // });

        if (self.users().length === 0)
            self.showAddForm();
    };

    self.reloadData();

    ViewModel = self;
};

