const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

// Dummy data for initial subscriptions
let subscriptions = [
  {
    id: 1,
    name: 'Subscription 1',
    date: '2023-06-01',
    startTime: '2023-06-26T19:15:00.000Z',
    endTime: '2023-07-26T19:31:00.000Z'
  },
  {
    id: 2,
    name: 'Subscription 2',
    date: '2023-06-01',
    startTime: '2023-07-01',
    endTime: '2023-07-31'
  },
  {
    id: 3,
    name: 'Subscription 3',
    date: '2023-06-01',
    startTime: '2023-07-01',
    endTime: '2023-07-31'
  }
];


// Get all subscriptions
app.get('/subscriptions', (req, res) => {
  res.json(subscriptions);
});

// Get a specific subscription by ID
app.get('/subscriptions/:id', (req, res) => {
  const subscription = subscriptions.find(sub => sub.id === parseInt(req.params.id));
  if (!subscription) {
    res.status(404).send('Subscription not found');
    return;
  }
  res.json(subscription);
});

// Create a new subscription
app.post('/subscriptions', (req, res) => {
  const { name,date, startTime, endTime } = req.body;
  const id = subscriptions.length + 1;
  const newSubscription = {
    id,
    name,
    date,
    startTime,
    endTime
  };
  subscriptions.push(newSubscription);
  res.json(newSubscription);
});

// Update an existing subscription
app.put('/subscriptions/:id', (req, res) => {
  const subscription = subscriptions.find(sub => sub.id === parseInt(req.params.id));
  if (!subscription) {
    res.status(404).send('Subscription not found');
    return;
  }
  const { name,date, startTime, endTime } = req.body;
  subscription.name = name;
  subscription.date = date;
  subscription.startTime = startTime;
  subscription.endTime = endTime;
  res.json(subscription);
});

// Delete a subscription
app.delete('/subscriptions/:id', (req, res) => {
  const subscriptionIndex = subscriptions.findIndex(sub => sub.id === parseInt(req.params.id));
  if (subscriptionIndex === -1) {
    res.status(404).send('Subscription not found');
    return;
  }
  const deletedSubscription = subscriptions[subscriptionIndex];
  subscriptions.splice(subscriptionIndex, 1);
  res.json(deletedSubscription);
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
