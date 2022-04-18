# Auth0 Multiple Organization Branding Demo

This Auth0 reference implementation uses terraform and docker to deploy two custom branded applications (moon-app & mars-app) which will use the same Auth0 universal login screen for both apps. You can use [Auth0 Universal Login Page Templates](https://auth0.com/docs/customize/universal-login-pages/universal-login-page-templates) to define the content displayed around the Universal Login widgets (e.g., the Login box, the MFA box). The same template is used for all pages, helping you implement a consistent, branded login experience across all B2B customers with less effort.

[TODO: working gif of example]

## Use Case
There are multiple Business-to-Business (B2B) use case scenarios where users end up belonging to third-party organizations that have signed up for the services you provide. Your customers often require the need to customize the login experience based on the company's brand that initiated the login. If a user logs in from Company A's app, it should show the Company A's brand (logo, background image, and colors). If the user logs in from Company B's app, it will alternatively show Company B's logo, background image, and colors. 

## 🚀 Getting Started

### Prerequisites

There are a few things you will need setup on your computer before getting started:

1. [Free Auth0 Account](https://auth0.com/signup) with a [custom domain configured](https://auth0.com/docs/customize/custom-domains/auth0-managed-certificates)
1. [Docker](https://www.docker.com/get-started). You can check that Docker is installed properly by running `docker info` in your console. 
1. [Terraform](https://learn.hashicorp.com/terraform/getting-started/install). You can check that Terraform is installed properly by running `terraform -v` in your console. 

> Please make sure these are installed on your machine before continuing. 

In order for Terraform to be able to create Clients and APIs in Auth0 automagically (yes, it's a word), you'll need to manually create an Auth0 Machine-to-Machine Application that allows Terraform to communicate with Auth0. 
1. Navigate to your [Auth0 Dashboard](https://manage.auth0.com/dashboard) -> Applications -> Create Application.
1. Name your new application `Terraform Auth0 Provider`. 
1. Select `Machine To Machine Applications` and Create.
1. Under settings, save the `domain`, `client_id`, and `client_secret` for later.

### Running locally

In order for the Terraform automation to run smoothly, a few local environment files will need to be created.

- First, clone https://github.com/tylernix/auth0-multiple-orgs-branding-demo.git.
- Create a `local.tfvars` in your root project directory that defines the necessary Auth0 configuration values as follows:

```bash
# The url of your Auth0 tenant domain (without the https://). This is not your custom domain url. 
auth0_domain = "YOUR_AUTH0_DOMAIN.auth0.com"
# The url of the custom domain setup in Auth0 (include the https://). 
auth0_base_issuer_url = "https://YOUR_AUTH0_CUSTOM_DOMAIN.com"
# Your Auth0 Terraform Auth0 Provider M2M Client ID
auth0_client_id = "YOUR_AUTH0_CLIENT_ID"
# Your Auth0 Terraform Auth0 Provider M2M Client Secret
auth0_client_secret = "YOUR_AUTH0_CLIENT_SECRET"
# Random password to be used to configure a test user account in Auth0. Does not need to be secure.
auth0_secret = "LONG_RANDOM_VALUE"
```

You can execute the following command in your console to generate a suitable string for the `auth0_secret` value:

```bash
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

### Terraform

Once you have your local variables set up, you can run terraform. 

- First, run `terraform init` in your console inside the root of your project. This command gets your Terraform environment ready to go, installing any plugins and providers required for your configuration.
- Run `terraform apply -var-file="local.tfvars"`. Type `yes` and hit enter. Terraform will now take care of the hard work of creating all the resources necessary to get this demo up and running in your Auth0 tenant. Most Terraform providers are [idempotent](https://en.wikipedia.org/wiki/Idempotence), meaning running `terraform apply` doesn't have any additional effect once the infrastructure is set up.

Terraform will create:
1. Two clients in Auth0 called `moon-app` and `mars-app`.
1. A database in Auth0 to store users called `multiple-orgs-branding-user-db`.
1. Retrieve the HTML liquid template from `auth0-page-template.liquid` and upload it to the Auth0 Management API [/api/v2/branding/templates/universal-login](https://auth0.com/docs/api/management/v2#!/Branding/put_universal_login) endpoint.
1. Two Docker images for the moon and mars apps.
1. Two Docker containers running on **http://localhost:3000** and **http://localhost:3001**, passing in the configuration settings from the recently created Auth0 clients).

### Clean up

You can run `terraform destroy -var-file="local.tfvars"` to delete everything configured in this demo from Auth0 and stop the docker containers running locally.

## 🔎 Learn more

To learn more about Auth0, take a look at the following resources:
- [Customizing New Universal Login Pages](https://auth0.com/docs/customize/universal-login-pages/universal-login-page-templates)
- [Customizing New Universal Login Text Prompts](https://auth0.com/docs/customize/universal-login-pages/customize-login-text-prompts)
- [Using Terraform to manage your Auth0 configuration](https://auth0.com/blog/use-terraform-to-manage-your-auth0-configuration/)
- [Designing a multiple organization architecture in Auth0](https://auth0.com/docs/get-started/architecture-scenarios/multiple-organization-architecture)