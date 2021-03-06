import React from 'react';
import $ from 'jquery';
import 'fullcalendar';
import 'fullcalendar/dist/fullcalendar.css';
import { List } from 'immutable';

import '../stylesheets/materialFullCalendar.css';
import { findSelected } from '../helpers';

export default class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.updateEvents = this.updateEvents.bind(this);
  }
  componentDidMount() {
    this.updateEvents(this.props.coursecomps);
  }
  componentDidUpdate() {
    this.updateEvents(this.props.coursecomps);
  }
  updateEvents(events) {
    $('#calendar').fullCalendar('destroy'); // Make sure it resets before every load
    $('#calendar').fullCalendar({
      editable: false, // Don't allow editing of events
      weekends: false, // Hide weekends
      defaultView: 'agendaWeek', // Only show week view
      header: false, // Hide buttons/titles
      minTime: '08:00:00', // Start time for the calendar
      maxTime: '22:00:00', // End time for the calendar
      columnFormat: 'ddd',
      allDaySlot: false, // Get rid of "all day" slot at the top
      height: 'auto', // Get rid of  empty space on the bottom
      events,
      eventRender: (event, element) => {
        $(element).css('cursor', 'pointer'); // Make events look clickable
        $(element).hover(() => {
          $(element).css('opacity', 0.7);
        }, () => {
          $(element).css('opacity', 1);
        });
      },
      eventClick: (event) => {
        // Find the corresponding event from the state arrays
        this.props.selectEvent(findSelected(
          this.props.sections,
          this.props.components,
          this.props.customEvents,
          event.id
        ));
      }
    });
  }
  render() {
    return <div id="calendar"></div>;
  }
}

Calendar.propTypes = {
  coursecomps: React.PropTypes.arrayOf(React.PropTypes.object),
  selectEvent: React.PropTypes.func,
  sections: React.PropTypes.instanceOf(List),
  components: React.PropTypes.instanceOf(List),
  customEvents: React.PropTypes.instanceOf(List)
};
