import { Injectable } from '@nestjs/common';
const BASE_URL = 'http://localhost:3030/tracks/';
import { Track } from './track.interface';
@Injectable()
export class TrackService {
  async getTracks(): Promise<Track[]> {
    const res = await fetch(BASE_URL);
    const parsed = res.json();
    return parsed;
  }

  async getTrackById(id: number): Promise<Track> {
    const res = await fetch(BASE_URL + id);
    const parsed = await res.json();
    return parsed;
  }

  async createTrack(track: Track): Promise<Track> {
    const id = await this.setId();
    const { title, duration, artist } = track;
    const newTrack = { id, title, duration, artist };
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTrack),
    });
    const parsed = res.json();
    return parsed;
  }

  async deleteTrackById(id: number) {
    const res = await fetch(BASE_URL + id, {
      method: 'DELETE',
    });
    const parsed = await res.json();
    return parsed;
  }
  async updateTrackById(id: number, body: Track): Promise<void> {
    const isTrack = await this.getTrackById(id);
    if (!isTrack) return;
    const updatedTrack = {
      title: body.title,
      duration: body.duration,
      artist: body.artist,
    };
    const res = await fetch(BASE_URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedTrack),
    });
  }

  async setId(): Promise<number> {
    const tracks = await this.getTracks();
    const id = tracks.pop().id + 1;
    return id;
  }
}
