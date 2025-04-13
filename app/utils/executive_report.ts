import si from 'systeminformation';
import fs from 'fs';
import { timeStamp } from 'console';

// Interface for CPU metrics
interface CpuMetrics {
    manufacturer: string; // CPU manufacturer (e.g., Intel, AMD)
    brand: string; // CPU brand/model (e.g., Core i7, Ryzen 5)
    cores: number; // Number of physical CPU cores
    speed: number; // CPU speed in GHz
    usage: number; // Overall CPU usage percentage
    temperature: number | null; // CPU temperature in °C (null if unavailable)
}

// Function to retrieve CPU metrics
async function getCpuMetrics(): Promise<CpuMetrics> {
    const cpu = await si.cpu(); // Fetch CPU information
    const currentLoad = await si.currentLoad(); // Fetch current CPU load
    const cpuTemperature = await si.cpuTemperature().catch(() => ({ main: null })); // Fetch CPU temperature

    return {
        manufacturer: cpu.manufacturer,
        brand: cpu.brand,
        cores: cpu.cores,
        speed: cpu.speed,
        usage: Math.round(currentLoad.currentLoad),
        temperature: cpuTemperature.main,
    };
}

// Interface for memory metrics
interface MemoryCriticalMetrics {
    total: number; // Total physical memory in GB
    used: number; // Used memory in GB
    free: number; // Free memory in GB
    swapUsed: number; // Swap memory usage in GB (high usage indicates potential memory issues)
    cache: number; // Cached memory in GB
}

// Function to retrieve memory metrics
async function getMemoryMetrics(): Promise<MemoryCriticalMetrics> {
    const mem = await si.mem(); // Fetch memory information
    return {
        total: Math.round(mem.total / 1024 / 1024 / 1024 * 100) / 100, // Convert bytes to GB
        used: Math.round(mem.used / 1024 / 1024 / 1024 * 100) / 100, // Convert bytes to GB
        free: Math.round(mem.free / 1024 / 1024 / 1024 * 100) / 100, // Convert bytes to GB
        swapUsed: Math.round((mem.swaptotal - mem.swapfree) / 1024 / 1024 / 1024 * 100) / 100, // Convert bytes to GB
        cache: Math.round(mem.cached / 1024 / 1024 / 1024 * 100) / 100, // Convert bytes to GB
    };
}

// Interface for disk metrics
interface DiskCriticalMetrics {
    total: number; // Total disk space in GB
    used: number; // Used disk space in GB
    free: number; // Free disk space in GB
    usagePercent: number; // Disk usage percentage
}

// Function to retrieve disk metrics
async function getDiskMetrics(): Promise<DiskCriticalMetrics> {
    const [fs, io] = await Promise.all([
        si.fsSize(), // Fetch filesystem size information
        si.disksIO().catch(() => ({ fsBusy: 0 })) // Fetch disk I/O stats (fallback if unavailable)
    ]);

    const rootDisk = fs.find(disk => disk.mount === '/') || fs[0]; // Identify root disk
    return {
        total: Math.round(rootDisk.size / 1024 / 1024 / 1024 * 100) / 100,
        used: Math.round(rootDisk.used / 1024 / 1024 / 1024 * 100) / 100,
        free: Math.round(rootDisk.available / 1024 / 1024 / 1024 * 100) / 100,
        usagePercent: Math.round(rootDisk.use),
    };
}

// Interface for network metrics
interface NetworkCriticalMetrics {
    rxSec: number; // Network receive rate in MB/s
    txSec: number; // Network transmit rate in MB/s
    errors: number; // Total network errors
    dropped: number; // Total dropped packets
}

// Function to retrieve network metrics
async function getNetworkMetrics(): Promise<NetworkCriticalMetrics> {
    const network = await si.networkStats('eth0'); // Replace with primary network interface
    return {
        rxSec: Math.round(network[0].rx_sec / 1024 / 1024 * 100) / 100,
        txSec: Math.round(network[0].tx_sec / 1024 / 1024 * 100) / 100,
        errors: network[0].rx_errors + network[0].tx_errors,
        dropped: network[0].rx_dropped + network[0].tx_dropped
    };
}

// Interface for system metrics
interface SystemCriticalMetrics {
    uptime: number; // System uptime in days
    os: string; // Operating system name and version
    kernel: string; // Kernel version
    hostname: string; // System hostname
}

// Function to retrieve system metrics
async function getSystemMetrics(): Promise<SystemCriticalMetrics> {
    const [os, time] = await Promise.all([si.osInfo(), si.time()]); // Fetch OS and time information
    return {
        uptime: Math.round(time.uptime / 86400 * 100) / 100, // Convert seconds to days
        os: `${os.distro} ${os.release}`,
        kernel: os.kernel,
        hostname: os.hostname
    };
}

// Function to generate an executive report containing all metrics
async function getExecutiveReport() {
    const cpuMetrics: CpuMetrics= await getCpuMetrics();
    const memMetrics: MemoryCriticalMetrics= await getMemoryMetrics();
    const diskMetrics: DiskCriticalMetrics= await getDiskMetrics();
    const systemMetrics: SystemCriticalMetrics= await getSystemMetrics();
    const networkMetrics: NetworkCriticalMetrics= await getNetworkMetrics();

    return {
        timestamp: new Date().toISOString(),
        service: String(process.env.SERVICE_NAME || 'Accounting Service'),
        cpu_manufacturer : cpuMetrics.manufacturer,
        cpu_brand:cpuMetrics.brand,
        cpu_cores:cpuMetrics.cores,
        cpu_speed: cpuMetrics.speed,
        cpu_usage:cpuMetrics.usage,
        cpu_temperature: cpuMetrics.temperature,
        memory_total: memMetrics.total,
        memory_used: memMetrics.used,
        memory_free:memMetrics.free,
        memory_swap_used:memMetrics.swapUsed,
        memory_cache: memMetrics.cache,
        disk_total: diskMetrics.total,
        disk_used: diskMetrics.used,
        disk_free: diskMetrics.free,
        disk_usage_percent: diskMetrics.usagePercent,
        network_rx_sec: networkMetrics.rxSec,
        network_tx_sec: networkMetrics.txSec,
        network_errors:networkMetrics.errors,
        network_dropped: networkMetrics.dropped,
        system_uptime: systemMetrics.uptime,
        system_os: systemMetrics.os,
        system_kernel: systemMetrics.kernel,
        system_hostname:systemMetrics.hostname
    }
}

// Function to write the report to a file
export async function writeReport() {
    try {
        const report = await getExecutiveReport();
        const path = './app/logs/executive_report.log';
        fs.appendFileSync(path, JSON.stringify(report) + '\n');
        console.log(`Executive Report written to ${path}`);
    } catch (error) {
        console.error('Failed to write executive report:', error);
    }
}