import { interpolate } from '@pulumi/pulumi';

import { pipe } from 'fp-ts/lib/function';

import { pulumiConfig } from './pulumi-config';
import { createResourceGroup } from './services/resource-group.service';
import {
  createMongoDbAccount,
  createMongoDbDatabase,
  createMongoDbCollectionWithTypeShardKey,
} from './services/mongodb.service';
import { createStorageAccount } from './services/storage-account.service';
import {
  createPrivateBlobContainer,
  createPublicBlobContainer,
  createBlobWithAsset,
} from './services/blob-storage.service';

import //  getServerlessFunctionsAsset,
//  createServerlessFunctionsPlan,
//  createServerlessFunctionsWebApp,
'./services/serverless.service';

const resourceGroup = pipe(
  pulumiConfig.resourceGroupName,
  createResourceGroup(pulumiConfig.location)
);

const mongoDbCollection = pipe(
  resourceGroup,
  createMongoDbAccount(pulumiConfig.mongoDbAccountName),
  createMongoDbDatabase(pulumiConfig.mongoDbDatabaseName),
  createMongoDbCollectionWithTypeShardKey(pulumiConfig.mongoDbCollectionName)
);

const uploadsStorageAccount = pipe(
  resourceGroup,
  createStorageAccount(pulumiConfig.uploadsStorageAccountName)(false),
  createPrivateBlobContainer(pulumiConfig.uploadsBlobContainerName)
);

const contentStorageAccount = pipe(
  resourceGroup,
  createStorageAccount(pulumiConfig.contentStorageAccountName)(true),
  createPublicBlobContainer(pulumiConfig.contentBlobContainerName)
);

const serverlessStorageAccount = pipe(
  resourceGroup,
  createStorageAccount(pulumiConfig.serverlessStorageAccountName)(false),
  createPrivateBlobContainer(pulumiConfig.serverlessBlobContainerName)
  //createBlobWithAsset(pulumiConfig.serverlessBlobName)(
  //  getServerlessAsset()
  //)
);

export const resourceGroupUrn = resourceGroup.urn;
export const mongoDbAccountUrn = mongoDbCollection.databaseAccount.urn;
export const mongoDbDatabaseUrn = mongoDbCollection.database.urn;
export const mongoDbCollectionUrn = mongoDbCollection.collection.urn;

export const uploadsStorageAccountUrn =
  uploadsStorageAccount.storageAccount.urn;
export const uploadsBlobContainerUrn = uploadsStorageAccount.blobContainer.urn;

export const contentStorageAccountUrn =
  contentStorageAccount.storageAccount.urn;
export const contentBlobContainerUrn = contentStorageAccount.blobContainer.urn;

//export const serverlessStorageAccountUrn = serverlessStorageAccount.urn;
//export const serverlessBlobContainerUrn =
//  serverlessBlobContainer.urn;

//export const serverlessBlobUrn = serverlessBlob.urn;

//export const endpoint = interpolate`https://${app.defaultHostName}/api/HelloNode?name=Pulumi`;

/*
import { getSignedBlobUrl } from './blob-storage.service';
{
  name: 'WEBSITE_RUN_FROM_PACKAGE',
  value: getSignedBlobUrl(blobStorage),
},
{
  name: 'TINY_PNG_API_KEY',
  value: '', //TODO: Get this value
},
{
  name: 'UPLOADS_CONNECTION_STRING',
  value: '',
},
{
  name: 'CONTENT_CONNECTION_STRING',
  value: '',
},







var cdnProfile = new Profile(settings.BlobStorageCdnProfileName, new ProfileArgs
{
    Name = settings.BlobStorageCdnProfileName,
    ResourceGroupName = settings.ResourceGroupName,
    Sku = "Standard_Microsoft"
});

var cdnEndpoint = new Endpoint(settings.BlobStorageCdnEndpointName, new EndpointArgs
{
    Name = settings.BlobStorageCdnEndpointName,
    ResourceGroupName = settings.ResourceGroupName,
    ProfileName = cdnProfile.Name,
    OriginHostHeader = storageAccount.PrimaryWebHost,
    Origins = new InputList<EndpointOriginArgs>
    {
        new EndpointOriginArgs
        {
            Name = "blobstorage", HostName = storageAccount.PrimaryWebHost
        }
    },
    IsHttpAllowed = false,
    IsHttpsAllowed = true,
});


const customImage = "node-app";

const registry = new azure.containerservice.Registry("myregistry", {
    resourceGroupName: resourceGroup.name,
    sku: "Basic",
    adminEnabled: true,
});

const myImage = new docker.Image(customImage, {
    imageName: pulumi.interpolate`${registry.loginServer}/${customImage}:v1.0.0`,
    build: {
        context: `./${customImage}`,
    },
    registry: {
        server: registry.loginServer,
        username: registry.adminUsername,
        password: registry.adminPassword,
    },
});

const getStartedApp = new azure.appservice.AppService("get-started", {
    resourceGroupName: resourceGroup.name,
    appServicePlanId: plan.id,
    appSettings: {
      WEBSITES_ENABLE_APP_SERVICE_STORAGE: "false",
      DOCKER_REGISTRY_SERVER_URL: pulumi.interpolate`https://${registry.loginServer}`,
      DOCKER_REGISTRY_SERVER_USERNAME: registry.adminUsername,
      DOCKER_REGISTRY_SERVER_PASSWORD: registry.adminPassword,
      WEBSITES_PORT: "80", // Our custom image exposes port 80. Adjust for your app as needed.
    },
    siteConfig: {
        alwaysOn: true,
        linuxFxVersion: pulumi.interpolate`DOCKER|${myImage.imageName}`,
    },
    httpsOnly: true,
});


export const uploadAppPlanUrn = uploadAppPlan.urn;

export const getStartedEndpoint = pulumi.interpolate`https://${getStartedApp.defaultSiteHostname}`;
*/
