const Event = require('../../models/event');
const User = require('../../models/user');
const { dateToSring } = require('../../helper/date');

const events = async eventIds => {
    try {
        const events = await Event.find({ _id: { $in: eventIds } })
        return events.map(event => {
            return transformEvent(event);
        });
    } catch (err) {
        throw err;
    }
};

const singleEvent = async eventId => {
    try {
        const event = await Event.findById(eventId);
        return transformEvent(event);
    } catch (err) {
        throw err;
    }
};

const user = async userId => {
    try {
        const user = await User.findById(userId)
            return {
                ...user._doc,
                _id: user.id,
                createdEvents: events.bind(this, user._doc.createdEvents)
            };
    } catch (err) {
        throw err;
    }
};

const transformEvent = event => {
    return {
        ...event._doc,
        _id: event.id,
        date: dateToSring(event._doc.date),
        creator: user.bind(this, event.creator)
    }
};

const transformBooking = booking => {
    return {
        ...booking._doc,
        _id: booking.id,
        user: user.bind(this, booking._doc.user),
        event: singleEvent.bind(this, booking._doc.event),
        createdAt: dateToSring(booking._doc.createdAt),
        updatedAt: dateToSring(booking._doc.updatedAt)
    }
};

exports.transformEvent = transformEvent;
exports.transformBooking = transformBooking;