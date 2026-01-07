import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private requests = new Map<string, number[]>();
  private limit = 100; // requests
  private window = 60000; // 1 minute

  use(req: Request, res: Response, next: NextFunction) {
    const ip = req.ip;
    const now = Date.now();

    if (!this.requests.has(ip)) {
      this.requests.set(ip, []);
    }

    const times = this.requests.get(ip);
    const recentRequests = times.filter(t => now - t < this.window);

    if (recentRequests.length >= this.limit) {
      return res.status(429).json({
        statusCode: 429,
        message: 'Too many requests, please try again later.',
      });
    }

    recentRequests.push(now);
    this.requests.set(ip, recentRequests);

    res.set('X-RateLimit-Limit', this.limit.toString());
    res.set('X-RateLimit-Remaining', (this.limit - recentRequests.length).toString());

    next();
  }
}
