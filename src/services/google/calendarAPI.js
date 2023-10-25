let calendar = {
    calendarApi (authorizeButton, signoutButton, pre) {
        // Client ID and API key from the Developer Console
      var CLIENT_ID = '59002087758-6m0bk62ohasfuus8i9a5i3qk9ul1ruof.apps.googleusercontent.com';
      var API_KEY = 'AIzaSyD7o4LK3uMiyPWSCrMRIaTqMfIbzxJw_OQ';

      // Array of API discovery doc URLs for APIs used by the quickstart
      var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

      // Authorization scopes required by the API; multiple scopes can be
      // included, separated by spaces.
      var SCOPES = "https://www.googleapis.com/auth/calendar";

    //   var authorizeButton = document.getElementById('authorize_button');
    //   var signoutButton = document.getElementById('signout_button');

      /**
       *  On load, called to load the auth2 library and API client library.
       */
      function handleClientLoad() {
        gapi.load('client:auth2', initClient);
      }
      window.onload = function () {
          handleClientLoad()
      }

      /**
       *  Initializes the API client library and sets up sign-in state
       *  listeners.
       */
      function initClient() {
        gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES
        }).then(function () {
          // Listen for sign-in state changes.
          gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

          // Handle the initial sign-in state.
          updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
          authorizeButton.onclick = handleAuthClick;
          signoutButton.onclick = handleSignoutClick;
        }, function(error) {
          appendPre(JSON.stringify(error, null, 2));
        });
      }

      /**
       *  Called when the signed in status changes, to update the UI
       *  appropriately. After a sign-in, the API is called.
       */
      const updateSigninStatus = (isSignedIn) => {
        if (isSignedIn) {
          authorizeButton.style.display = 'none';
          signoutButton.style.display = 'block';
          listUpcomingEvents();
          this.addEvent();
          handleSignoutClick()
        } else {
          authorizeButton.style.display = 'block';
          signoutButton.style.display = 'none';
        }
      }

      /**
       *  Sign in the user upon button click.
       */
      function handleAuthClick(event) {
        gapi.auth2.getAuthInstance().signIn();
      }

      /**
       *  Sign out the user upon button click.
       */
      function handleSignoutClick(event) {
        gapi.auth2.getAuthInstance().signOut();
      }

      /**
       * Append a pre element to the body containing the given message
       * as its text node. Used to display the results of the API call.
       *
       * @param {string} message Text to be placed in pre element.
       */
      function appendPre(message) {
        // var pre = document.getElementById('content');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      function listUpcomingEvents() {
        gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        }).then(function(response) {
            console.log(response)
          var events = response.result.items;
          appendPre('Upcoming events:');

          if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
              var event = events[i];
              var when = event.start.dateTime;
              if (!when) {
                when = event.start.date;
              }
              appendPre(event.summary + ' (' + when + ')')
            }
          } else {
            appendPre('No upcoming events found.');
          }
        });
      }
    },
    addEvent () {

        // function appendPre(message) {
        //     // var pre = document.getElementById('content');
        //     var textContent = document.createTextNode(message + '\n');
        //     pre.appendChild(textContent);
        //   }
        var event = {
            'summary': 'Experience Season5',
            'location': '32, bashua, Street',
            'description': 'A powerful experience in the presence of God',
            'start': {
              'dateTime': '2021-12-09T14:47:49.918Z',
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'end': {
              'dateTime': '2021-12-09T15:47:49.918Z',
              'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone
            },
            'recurrence': [
              'RRULE:FREQ=DAILY;COUNT=2'
            ],
            'attendees': [
              {'email': 'lpage@example.com'},
              {'email': 'sbrin@example.com'}
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10}
              ]
            }
          };
          
          let calendarUrl;
          
          var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
          });
          
          request.execute(function(event) {
              console.log(event)
            // appendPre('Event created: ' + event.htmlLink);
            const newWindow = window.open('','_blank');
            newWindow.location = event.htmlLink
          });
    }
}

export default calendar