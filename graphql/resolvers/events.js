const Event = require('../../models/event');
const { transformEvent } = require('./merge');

module.exports = {
    events: async () => {
        try {
            const events = await Event.find()
            return events.map(transformEvent);
        } catch (err) {
            throw err;
        }
    },
    createEvent: async (args) => {
        const event = new Event({
            title: args.eventInput.title,
            description: args.eventInput.description,
            price: +args.eventInput.price,
            date: new Date(args.eventInput.date),
            creator: '60f0e30caec8112908890f39'
        });
        let createdEvent;
        try {
            const result = await event
            .save()
                createdEvent = transformEvent(event);
                const creator = await User.findById('60f0e30caec8112908890f39')
                if (!creator) {
                    throw new Error('User not found.');
                }
                creator.createdEvents.push(event);
                await creator.save();
                return createdEvent;
        } catch (err) { 
            console.log(err);
            throw err;
        }
    }
};