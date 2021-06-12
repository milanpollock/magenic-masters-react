import { Subscription } from 'rxjs';

import {
  BlobServiceClient,
  BlockBlobClient,
  ContainerClient,
} from '@azure/storage-blob';

import {
  AzureStorageContainerType,
  AZURE_STORAGE_CONNECTION_STRING_DEV,
} from '@dark-rush-photography/shared-server-types';
import { getAzureStorageContainerClient$ } from './azure-storage-container-client.functions';

describe('containerClient$', () => {
  let containerClientSubscription: Subscription | undefined;

  beforeEach(() => {
    const mockStaticFromConnectionString = jest.fn().mockReturnValue({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      getContainerClient(_containerName: string): ContainerClient {
        return {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          getBlockBlobClient(_blobName: string): BlockBlobClient {
            return {} as BlockBlobClient;
          },
        } as ContainerClient;
      },
    } as BlobServiceClient);

    BlobServiceClient.fromConnectionString = mockStaticFromConnectionString;
  });

  it('should provide a container client for the private container', () => {
    containerClientSubscription = getAzureStorageContainerClient$(
      AZURE_STORAGE_CONNECTION_STRING_DEV,
      AzureStorageContainerType.Private
    ).subscribe((containerClient) => {
      expect(containerClient).toBeDefined();
    });
  });

  it('should provide a container client for the public container', () => {
    containerClientSubscription = getAzureStorageContainerClient$(
      AZURE_STORAGE_CONNECTION_STRING_DEV,
      AzureStorageContainerType.Public
    ).subscribe((containerClient) => {
      expect(containerClient).toBeDefined();
    });
  });

  afterEach(() => {
    if (containerClientSubscription) {
      containerClientSubscription.unsubscribe();
    }
  });
});
