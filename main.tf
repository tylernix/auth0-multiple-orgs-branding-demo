variable "auth0_domain" {}
variable "auth0_client_id" {}
variable "auth0_client_secret" {}


terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 2.13.0"
    }
    auth0 = {
      source = "auth0/auth0"
      version = "0.29.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "moon-app" {
  name = "moon-app:1.0"
  build {
    path = "./moon-app"
    tag  = ["moon-app:1.0"]
  }
}

resource "docker_image" "mars-app" {
  name = "mars-app:1.0"
  build {
    path = "./mars-app"
    tag  = ["mars-app:1.0"]
  }
}

# resource "null_resource" "example1" {
#   provisioner "local-exec" {
#     command = "node -e 'console.log(crypto.randomBytes(32).toString('hex'))'"
#   }
# }

resource "docker_container" "moon-app" {
  image = docker_image.moon-app.latest
  name  = "moon-app"
  ports {
    internal = 3000
    external = 3000
  }
  env = [
    "AUTH0_CLIENT_ID=${auth0_client.moon-app.client_id}",
    "AUTH0_CLIENT_SECRET=${auth0_client.moon-app.client_secret}",
    "AUTH0_BASE_URL=http://localhost:3000",
  ]
}

resource "docker_container" "mars-app" {
  image = docker_image.mars-app.latest
  name  = "mars-app"
  ports {
    internal = 3001
    external = 3001
  }
  env = [
    "AUTH0_CLIENT_ID=${auth0_client.mars-app.client_id}",
    "AUTH0_CLIENT_SECRET=${auth0_client.mars-app.client_secret}",
    "AUTH0_BASE_URL=http://localhost:3001",
  ]
}

provider "auth0" {
  domain        = var.auth0_domain
  client_id     = var.auth0_client_id
  client_secret = var.auth0_client_secret
}

resource "auth0_client" "moon-app" {
  name                = "Moon App"
  description         = "App with Moon-style branding"
  app_type            = "regular_web"
  callbacks           = ["http://localhost:3000/api/auth/callback"]
  allowed_logout_urls = ["http://localhost:3000/"]
  oidc_conformant     = true
  is_first_party      = true

  jwt_configuration {
    alg = "RS256"
  }
}

resource "auth0_client" "mars-app" {
  name                = "Mars App"
  description         = "App with Mars-style branding"
  app_type            = "regular_web"
  callbacks           = ["http://localhost:3001/api/auth/callback"]
  allowed_logout_urls = ["http://localhost:3001/"]
  oidc_conformant     = true
  is_first_party      = true

  jwt_configuration {
    alg = "RS256"
  }
}

resource "auth0_connection" "custom-branding-user-db" {
  name     = "custom-branding-user-db"
  strategy = "auth0"
  options {
    password_policy        = "good"
  }
  enabled_clients = [auth0_client.moon-app.id, auth0_client.mars-app.id]
}

data "local_file" "auth0-page-template" {
  filename = "${path.module}/auth0-page-template.liquid"
}

resource "auth0_branding" "custom-branding" {
  logo_url = "https://mycompany.org/logo.png"
    colors {
        primary = "#0059d6"
        page_background = "#000000"
    }
    universal_login {
        body = data.local_file.auth0-page-template.content
    }
}


# resource "auth0_user" "custom-branding-example-user" {
#   connection_name = auth0_connection.customer-branding-user-db.name
#   email           = "user@example.com"
#   email_verified  = true
#   password        = "Password1!"
# }