import { useNavigate } from '@remix-run/react'
import { BlockStack, Card, FullscreenBar, Layout, List, Page, Text } from '@shopify/polaris'
import React from 'react'

const Guide = () => {
    const navigate = useNavigate()
    return (
        <Page>
            <Layout>
                <Layout.Section>
                    <FullscreenBar onAction={() => navigate('/app')}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <Text variant="headingLg">Setup guide</Text>
                            </div>
                        </div>
                    </FullscreenBar>
                </Layout.Section>
                <Layout.Section>
                    <Card background="bg-surface-secondary">
                        <BlockStack gap="200">
                            <Text as="h3" variant="headingSm" fontWeight="bold">
                                Steps to Configure Your Shopify Application for Inventory Notifications 📧
                            </Text>
                            <List type='number'>
                                <List.Item>Go to the Configuration page.</List.Item>
                                <List.Item>Enter the Configuration Email and Threshold number (the threshold being the minimum quantity).</List.Item>
                                <List.Item>Click "Save" to save your changes.</List.Item>
                                <List.Item>Reduce the inventory of a product to below the threshold amount.</List.Item>
                                <List.Item>Look for the email notification message.</List.Item>
                            </List>
                        </BlockStack>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>
    )
}

export default Guide