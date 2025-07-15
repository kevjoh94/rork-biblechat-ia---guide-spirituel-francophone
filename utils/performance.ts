import React from 'react';
import { InteractionManager } from 'react-native';

export class PerformanceMonitor {
  private static measurements: Map<string, number> = new Map();
  private static logs: Array<{ name: string; duration: number; timestamp: number }> = [];

  static startMeasurement(name: string): void {
    this.measurements.set(name, Date.now());
  }

  static endMeasurement(name: string): number | null {
    const startTime = this.measurements.get(name);
    if (!startTime) {
      console.warn(`No start measurement found for: ${name}`);
      return null;
    }

    const duration = Date.now() - startTime;
    this.measurements.delete(name);
    
    this.logs.push({
      name,
      duration,
      timestamp: Date.now(),
    });

    if (__DEV__) {
      console.log(`⏱️ ${name}: ${duration}ms`);
    }

    return duration;
  }

  static measureAsync<T>(name: string, fn: () => Promise<T>): Promise<T> {
    this.startMeasurement(name);
    return fn().finally(() => {
      this.endMeasurement(name);
    });
  }

  static measureSync<T>(name: string, fn: () => T): T {
    this.startMeasurement(name);
    try {
      return fn();
    } finally {
      this.endMeasurement(name);
    }
  }

  static getLogs(): Array<{ name: string; duration: number; timestamp: number }> {
    return [...this.logs];
  }

  static clearLogs(): void {
    this.logs = [];
  }

  static getAverageDuration(name: string): number {
    const measurements = this.logs.filter(log => log.name === name);
    if (measurements.length === 0) return 0;
    
    const total = measurements.reduce((sum, log) => sum + log.duration, 0);
    return total / measurements.length;
  }
}

export const runAfterInteractions = (fn: () => void): void => {
  InteractionManager.runAfterInteractions(fn);
};

export const createPerformanceHOC = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) => {
  return React.memo((props: P) => {
    React.useEffect(() => {
      PerformanceMonitor.startMeasurement(`${componentName}_mount`);
      return () => {
        PerformanceMonitor.endMeasurement(`${componentName}_mount`);
      };
    }, []);

    return React.createElement(WrappedComponent, props);
  });
};

// Memory usage monitoring (development only)
export const logMemoryUsage = (label: string = 'Memory Usage'): void => {
  if (__DEV__ && typeof window !== 'undefined') {
    const windowPerformance = (window as any).performance;
    if (windowPerformance && windowPerformance.memory) {
      const memory = windowPerformance.memory;
      console.log(`📊 ${label}:`, {
        used: `${Math.round(memory.usedJSHeapSize / 1024 / 1024)} MB`,
        total: `${Math.round(memory.totalJSHeapSize / 1024 / 1024)} MB`,
        limit: `${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)} MB`,
      });
    }
  }
};

// Bundle size analyzer helper
export const analyzeBundleSize = (): void => {
  if (__DEV__) {
    console.log('📦 Bundle Analysis:');
    console.log('- Consider using React.lazy() for code splitting');
    console.log('- Check for duplicate dependencies');
    console.log('- Use tree shaking for unused exports');
    console.log('- Optimize images and assets');
  }
};