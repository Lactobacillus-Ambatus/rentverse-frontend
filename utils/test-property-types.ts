// Test file to verify property types API integration
import { PropertyTypesApiClient } from '@/utils/propertyTypesApiClient'

async function testPropertyTypesAPI() {
  try {
    console.log('Testing Property Types API...')
    console.log('API URL:', 'https://curious-lively-monster.ngrok-free.app/api/property-types')
    
    // Test direct fetch first
    console.log('Testing direct fetch...')
    const directResponse = await fetch('https://curious-lively-monster.ngrok-free.app/api/property-types')
    console.log('Direct fetch status:', directResponse.status)
    console.log('Direct fetch headers:', Object.fromEntries(directResponse.headers.entries()))
    
    const directText = await directResponse.text()
    console.log('Direct response (first 300 chars):', directText.substring(0, 300))
    
    // Now test through our API client
    console.log('\nTesting through API client...')
    const response = await PropertyTypesApiClient.getPropertyTypes()
    console.log('API Response:', response)
    
    if (response.success) {
      console.log('✅ Successfully fetched property types')
      console.log('Property types found:', response.data.length)
      response.data.forEach(type => {
        console.log(`- ${type.name} (${type.code}): ${type.description}`)
      })
    } else {
      console.log('❌ API returned success: false')
    }
  } catch (error) {
    console.error('❌ Error testing API:', error)
    
    // Suggest alternatives
    console.log('\n💡 Possible solutions:')
    console.log('1. Check if the ngrok tunnel is running')
    console.log('2. Verify the API endpoint URL is correct')
    console.log('3. Try accessing the URL directly in browser first')
    console.log('4. Check if ngrok is showing a warning page')
  }
}

// Export for use in components
export const testAPI = testPropertyTypesAPI

// Uncomment to test immediately
// testPropertyTypesAPI()

export default testPropertyTypesAPI