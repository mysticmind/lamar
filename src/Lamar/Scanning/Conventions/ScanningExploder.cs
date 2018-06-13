﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;

namespace Lamar.Scanning.Conventions
{
    internal class ScanningExploder
    {
                
        internal static async Task<(ServiceRegistry, AssemblyScanner[])> Explode(IServiceCollection services)
        {
            if (!services.HasScanners())
            {
                return (new ServiceRegistry(services), new AssemblyScanner[0]);
            }

            var (registry, operations) = ParseToOperations(services);

            var scanners = operations.OfType<AssemblyScanner>().ToArray();

            foreach (var operation in operations)
            {
                if (operation is AssemblyScanner scanner)
                {
                    await scanner.ApplyRegistrations(registry);
                }

                if (operation is ServiceDescriptor[] descriptors)
                {
                    registry.AddRange(descriptors);
                }
            }

            return (registry, scanners);
        }

        internal static (ServiceRegistry, List<object>) ParseToOperations(IServiceCollection services)
        {
            var scanners = services
                .Where(x => x.ServiceType == typeof(AssemblyScanner))
                .ToArray();
                
            var indexes = scanners
                .Select(services.IndexOf)
                .ToArray();

            var operations = new List<object>();
            
            var initial = indexes[0] > 0 
                ? new ServiceRegistry(services.Take(indexes[0])) 
                : new ServiceRegistry();
            
            operations.Add(scanners[0].ImplementationInstance);

            for (int i = 1; i < indexes.Length; i++)
            {
                var index = indexes[i];
                var previous = indexes[i - 1];

                if (previous != index - 1)
                {
                    // they are not sequential, just add a Scan operation
                    var slice = services.Skip(previous + 1).Take(index - previous - 1).ToArray();
                    operations.Add(slice);
                }

                
                operations.Add(scanners[i].ImplementationInstance);
            }

            // Are there more?
            if (indexes.Last() != indexes.Length - 1)
            {
                operations.Add(services.Skip(indexes.Last() + 1).ToArray());
            }

            return (initial, operations);
        }

    }
}