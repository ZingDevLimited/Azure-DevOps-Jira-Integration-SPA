using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Extensions.Logging;
using AuthExample.Models;

namespace AuthExample.Functions
{
    public static class ValidatePRInfo
    {
        [FunctionName(nameof(ValidatePRInfo))]
        public static IActionResult Run(
            [HttpTrigger(AuthorizationLevel.Anonymous, "post")] ValidatePRInfoRequest req,
            [Table(Constants.PRDetailTableName, "{groupId}", "{pullRequestId}")] PRDetail match,
            ILogger log)
        {
            log.LogInformation("ValidatePRInfo HTTP trigger function processed a request.");

            string clientId = Environment.GetEnvironmentVariable("JiraClientId", EnvironmentVariableTarget.Process);
            if (string.IsNullOrWhiteSpace(clientId))
                throw new Exception("JiraClientId missing from configuration");

            string clientSecret = Environment.GetEnvironmentVariable("JiraClientSecret", EnvironmentVariableTarget.Process);
            if (string.IsNullOrWhiteSpace(clientSecret))
                throw new Exception("JiraClientSecret missing from configuration");

            if (match == null)
                return new NotFoundResult();

            if (string.IsNullOrWhiteSpace(req.token) || Utilities.HashValue(req.token) != match.HashedToken)
                return new UnauthorizedResult();

            var res = new ValidatePRInfoResponse
            {
                clientId = clientId,
                clientSecret = clientSecret
            };
            return new OkObjectResult(res);
        }
    }
}
