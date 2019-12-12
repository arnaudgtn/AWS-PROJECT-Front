var ViewModel = null;

var viewModel = function() {
    var self = this;

    self.users = ko.observableArray([]);

    self.name = ko.observable("");
    self.age = ko.observable("");
    self.gender = ko.observable(0);
    self.job = ko.observable("");

    self.displayAddForm = ko.observable(false);

    self.canSend = ko.computed(function() {
        return self.name() != "" && self.job() != "" && self.age() != "";
    }, self);

    self.showAddForm = function() {
        self.displayAddForm(true);
    };
    self.hideAddForm = function() {
        self.displayAddForm(false);
    };

    self.clearForm = function() {
        self.name("");
        self.age("");
        self.gender(0);
        self.job("");
    };

    self.reloadData = function() {
        $.get(API_URL + '/users', function (data) {
            if (data != null) {
                ko.mapping.fromJS(data, {}, self.users);
            } else {
                var users = [
                    {
                        Id: 1,
                        Name: "Issarni Théo",
                        Age: "50",
                        Gender: 0,
                        Job: "Dev"
                    },
                    {
                        Id: 2,
                        Name: "Guillotin Arnaud",
                        Age: "23",
                        Gender: 0,
                        Job: "Dev"
                    },
                    {
                        Id: 3,
                        Name: "Martin Clara",
                        Age: "26",
                        Gender: 1,
                        Job: "Teacher"
                    }
                ];
                ko.mapping.fromJS(users, {}, self.users);
            }
        });
    };

    self.sendAddForm = function() {
        if (!self.canSend()) {
            return;
        }

        var model = {
            Name: ko.observable(self.name()),
            Age: ko.observable(self.age()),
            Gender: ko.observable(self.gender()),
            Job: ko.observable(self.job())
        };

        model.Id = ko.observable(self.users().length !== 0 ? self.users()[self.users().length - 1].Id() + 1 : 1);

        self.users.push(model);
        toastr.success("User has been added to the list.");

        self.clearForm();
        self.hideAddForm();

        $.ajax({
            type: "POST",
            url: API_URL + '/user',
            data: model,
            success: function (data) {
                self.reloadData();
            }
        });
    };

    self.removeUser = function(data) {
        var id = data.Id();

        self.users.remove(function(user) {
            return user.Id() == id;
        });

        toastr.success("User has been removed from the list.");

        $.ajax({
            type: "DELETE",
            url: API_URL + '/user/' + id,
            success: function (data) {
                self.reloadData();
            }
        });

        if (self.users().length === 0) self.showAddForm();
    };

    self.reloadData();

    ViewModel = self;
};
