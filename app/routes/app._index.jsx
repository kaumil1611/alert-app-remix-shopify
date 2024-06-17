import { useLoaderData } from '@remix-run/react';
import { Box, Card, EmptyState, Layout, Page, Text, Spinner } from '@shopify/polaris';
import React, { useEffect, useState } from 'react';
import { apiVersion, authenticate } from '../shopify.server';

export const loader = async ({ request }) => {
  try {
    const { session } = await authenticate.admin(request);
    const { shop, accessToken } = session;
    const responseOfShop = await fetch(`https://${shop}/admin/api/${apiVersion}/shop.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': accessToken,
      }
    });
    const shopDetails = await responseOfShop.json();
    console.log(shopDetails, "shopDetails");
    return { shopDetails };
  } catch (error) {
    console.log(error, "ErrorResponse");
    return { error: error.message };
  }
};

const Index = () => {
  const data = useLoaderData();
  const [shopDetails, setShopDetails] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const shop = data?.shopDetails?.shop;
    const name = shop?.shop_owner;
    const email = shop?.email;
    const payload = {
      name: name.charAt(0).toUpperCase() + name.slice(1),
      email
    };
    setShopDetails(payload);
    setLoading(false); // Set loading to false once data is fetched and processed
  }, [data]);

  const greetings = () => {
    const currentHour = new Date().getHours();
    if (currentHour >= 5 && currentHour < 12) {
      return 'Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <Box style={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Box style={{ display: 'flex' }}>
                  <Text as="h1" variant="headingXl">
                    Good {greetings()}!&nbsp;
                  </Text>
                  {shopDetails?.name && <Text as="h1" variant="headingXl" style={{ display: 'none' }}>
                    {shopDetails.name}
                  </Text>}
                </Box>
                <Box paddingBlockStart="100">
                  <Text as="p" variant="bodyLg">
                    Welcome to the alert application
                  </Text>
                </Box>
                {shopDetails?.email && <Box paddingBlockStart="100">
                  <Text as="p" variant="bodyLg">
                    Email: <strong>{shopDetails?.email}</strong>
                  </Text>
                </Box>}
              </Box>
              <img
                src="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                alt="Online store dashboard"
                style={{ maxWidth: 100, height: 'auto', marginRight: '20px' }}
              />
            </Box>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <Card>
            {loading ? (
              <Spinner accessibilityLabel="Loading" size="large" />
            ) : (
              <EmptyState
                heading="Monitor your inventory levels and receive email alerts when stock runs low."
                action={{ content: 'Configuration email', url: '/app/configuration' }}
                secondaryAction={{
                  content: 'Products',
                  url: '/app/products',
                }}
                imageContained={true}
                image="https://codecrewinfotech.com/images/logos/logo-cc.png"
              >
                <p>Keep track of your inventory and get notified via email when product quantities fall below your set threshold.</p>
              </EmptyState>
            )}
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default Index;
