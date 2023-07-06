import { DummyData } from '@/dummy-data';
import fs from 'fs';
import path from 'path';
const URL =
  'https://nextjs-client-side-db43a-default-rtdb.europe-west1.firebasedatabase.app/events.json';
export const getAllEvents = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  const events: DummyData[] = [];
  for (const key in data) {
    events.push({
      id: key,
      title: data[key].title,
      description: data[key].description,
      location: data[key].location,
      date: data[key].date,
      image: data[key].image,
      isFeatured: data[key].isFeatured,
    });
  }
  return events;
};
export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};
export const getEventById = async (id: string) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};
export const getFilteredEvents = async (dateFilter: {
  year: number;
  month: number;
}) => {
  const { year, month } = dateFilter;
  const allEvents = await getAllEvents();
  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
};
export const buildPath = (folder: string, folderName: string) => {
  return path.join(process.cwd(), `${folder}`, `${folderName}.json`);
};
export const extractPath = (filePath: fs.PathOrFileDescriptor) => {
  const fileData = fs.readFileSync(filePath) as string | any;
  const data = JSON.parse(fileData);
  return data;
};
