# auth0-custom-branding-demo

This Auth0 reference implementation uses terraform and docker to deploy two custom branded applications (moon-app & mars-app) which will use the same Auth0 universal login screen for both. You can use [Auth0 Universal Login Page Templates](https://auth0.com/docs/customize/universal-login-pages/universal-login-page-templates) to define the content displayed around the Universal Login widgets (e.g., the Login box, the MFA box). The same template is used for all pages, helping you implement a consistent, branded login experience across all B2B customers with less effort.

[TODO: working gif of example]

## Use Case
Business-to-Business (B2B) customers often require the need to customize the login experience based on the company's brand that initiated the login. If a user logs in from Company A's app, it should show the Company A's brand (logo, background image, and colors). If the user logs in from Company B's app, it will alternatively show Company B's logo, background image, and colors. 

## 🚀 Getting Started

### Prerequisites

There are a few things you will need setup on your computer before getting started:

1. [Free Auth0 Account](https://auth0.com/signup) with a [custom domain configured](https://auth0.com/docs/customize/custom-domains/auth0-managed-certificates)
1. [Docker](https://www.docker.com/get-started). You can check that Docker is installed properly by running `docker info` in your console. 
1. [Terraform](https://learn.hashicorp.com/terraform/getting-started/install). You can check that Terraform is installed properly by running `terraform -v` in your console. 

In order for Terraform to be able to create Clients and APIs in Auth0 automagically (yes, it's a word), you'll need to manually create an Auth0 Machine-to-Machine Application that allows Terraform to communicate with Auth0. 
1. Navigate to your [Auth0 Dashboard](https://manage.auth0.com/dashboard) -> Applications -> Create Application.
1. Name your new application `Terraform Auth0 Provider`. 
1. Select **Machine To Machine Applications** and Create.
1. Under settings, save the **domain**, **client_id**, and **client_secret** for later.

### Running locally

In order for the Terraform automation to run smoothly, a few local environment files will need to be created.

- First, clone https://github.com/tylernix/auth0-custom-branding-demo.git.
- Create a `local.tfvars` under your root project directory that defines the necessary Auth0 configuration values as follows:

```bash
# The url of your Auth0 tenant domain (without the https://). This is not your custom domain url. 
auth0_domain = "YOUR_AUTH0_DOMAIN.auth0.com"
# Your Auth0 Terraform Auth0 Provider M2M Client ID
auth0_client_id = "YOUR_AUTH0_CLIENT_ID"
# Your Auth0 Terraform Auth0 Provider M2M Client Secret
auth0_client_secret = "YOUR_AUTH0_CLIENT_SECRET"
# Random password to be used to configure a test user account in Auth0. Does not need to be secure.
auth0_user_password = "Password1!"
```

> TODO: change the terraform script so that you dont even have to to this.

- Inside **BOTH** the moon-app and mars-app folders, create a `.env.local` file which contains:

**Moon-App**
```bash
# A long, secret value used to encrypt the session cookie
AUTH0_SECRET='LONG_RANDOM_VALUE'
# The url of your Auth0 tenant domain
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_CUSTOM_DOMAIN.com'
```

**Mars-App**
```bash
# A long, secret value used to encrypt the session cookie
AUTH0_SECRET='LONG_RANDOM_VALUE'
# The url of your Auth0 custom domain (include https://)
AUTH0_ISSUER_BASE_URL='https://YOUR_AUTH0_CUSTOMDOMAIN.com'
```

You can execute the following command in your console to generate a suitable string for the AUTH0_SECRET value:

```bash
node -e "console.log(crypto.randomBytes(32).toString('hex'))"
```

### Terraform

Once you have your local variables set up, you can run terraform. 

- First, run `terraform init` in your console. This command gets your Terraform environment ready to go, installing any plugins and providers required for your configuration.
- 