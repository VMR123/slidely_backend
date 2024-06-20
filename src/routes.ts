import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const dbPath = path.join(__dirname, 'db.json');

interface Submission {
  name: string;
  email: string;
  phone: string;
  github_link: string;
  stopwatch_time: string;
}

// Initialize db.json if it does not exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, JSON.stringify([]));
}

// Read the database
const readDb = (): Submission[] => {
  const data = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(data);
};

// Write to the database
const writeDb = (data: Submission[]) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

// Ping endpoint
router.get('/ping', (req, res) => {
  res.json(true);
});

// Submit endpoint
router.post('/submit', (req, res) => {
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const submissions = readDb();
  submissions.push({ name, email, phone, github_link, stopwatch_time });
  writeDb(submissions);
  res.status(201).json({ message: 'Submission saved' });
});

// Read endpoint
router.get('/read', (req, res) => {
  const index = parseInt(req.query.index as string, 10);
  const submissions = readDb();
  if (index >= 0 && index < submissions.length) {
    res.json(submissions[index]);
  } else {
    res.status(404).json({ message: 'Submission not found' });
  }
});

// Delete endpoint
router.delete('/delete', (req, res) => {
  const index = parseInt(req.query.index as string, 10);
  const submissions = readDb();
  if (index >= 0 && index < submissions.length) {
    submissions.splice(index, 1);
    writeDb(submissions);
    res.json({ message: 'Submission deleted' });
  } else {
    res.status(404).json({ message: 'Submission not found' });
  }
});

// Edit endpoint
router.put('/edit', (req, res) => {
  const index = parseInt(req.query.index as string, 10);
  const { name, email, phone, github_link, stopwatch_time } = req.body;
  const submissions = readDb();
  if (index >= 0 && index < submissions.length) {
    submissions[index] = { name, email, phone, github_link, stopwatch_time };
    writeDb(submissions);
    res.json({ message: 'Submission updated' });
  } else {
    res.status(404).json({ message: 'Submission not found' });
  }
});

// Search endpoint
router.get('/search', (req, res) => {
  const email = req.query.email as string;
  const submissions = readDb();
  const result = submissions.filter(submission => submission.email === email);
  if (result.length > 0) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'No submissions found for this email' });
  }
});

export default router;
