Messages = new Mongo.Collection("messages");

if (Meteor.isClient) {

  Meteor.subscribe("tasks");
  Template.inputBar.events({
    'submit .input-message': function (e) {
      e.preventDefault();
      text = e.target.text.value;
      user = Meteor.user();
      Messages.insert({username: user.emails[0].address, text: text, createdAt: new Date()})
      e.target.reset();
    }
  });
  Template.messagesContainer.helpers({
    messages: function() {
      return Messages.find();
    }
  })
}



if (Meteor.isServer) {

  Meteor.publish("messages", function () {
    return Messages.find();
  });

  Meteor.startup(function () {
    // code to run on server at startup
  });
}


MessageSchema = new SimpleSchema({
  username: {
    type: String,
    label: "Username",
    max: 122
  },
  text: {
    type: String,
    label: "Text",
    max: 225
  },
creaetedAt: {
  type: Date
}
});
