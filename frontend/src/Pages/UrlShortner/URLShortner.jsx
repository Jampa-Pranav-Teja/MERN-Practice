import React, { useEffect } from 'react'
import { TextInput } from '@mantine/core';
import { Stack } from '@mantine/core';
import Service from '../../utils/http'; 
import { useState } from 'react';

const URLShortner = () => {
    const service = new Service();
    const [data, setData] = useState({
        originalUrl: '',
        customUrl: '',
        title: ''
    });

    const [shortenedData, setShortenedData] = useState(null);

    const shortenUrl = async () => {
        try {
            const response = await service.post('s', data);
            setShortenedData(response);
            console.log(`https://url-shortener-bootcamp.onrender.com/url/shortener/api/s/${response.shortCode}`);
        } catch (error) {
            console.error('Error occurred while shortening URL:', error);
        }
    };

  return (
        <>
        {shortenedData && shortenedData.shortCode && shortenedData.shortCode.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80px' , width: '100%' , margin: 'auto' , marginTop: '50px', borderRadius: '10px' , }}>
                <div style={{ backgroundColor: '#f0f0f0', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '60px' , width: '60%' , margin: 'auto' , marginTop: '10px', borderRadius: '10px' , padding: '20px' }}>
                <p>{`https://url-shortener-bootcamp.onrender.com/api/s/${shortenedData.shortCode}`}</p>
                </div>
            </div>
        ) :
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' , width: '40%' , margin: 'auto' , marginTop: '50px', borderRadius: '10px' }}>
        <Stack>
            <TextInput onChange = {(event) => setData({...data, originalUrl: event.target.value})} style={{ width: '400px', marginBottom: '20px' }}
                label="Original URL"
                withAsterisk
                placeholder="Enter the original URL here"
            />
            <TextInput onChange = {(event) => setData({...data, customUrl: event.target.value})} style={{ width: '400px', marginBottom: '20px' }}
                label="Customize your link ( Optional )"
                placeholder="Enter a custom link"
            />
            <TextInput onChange = {(event) => setData({...data, title: event.target.value})}    style={{ width: '400px', marginBottom: '20px' }}
                label="Title ( Optional )"
                placeholder="Enter a title for your link"
            />
            <button onClick={() => {
                shortenUrl();
            }} style={{ width: '400px', padding: '10px', backgroundColor: '#0062ff', color: 'white', border: 'none', borderRadius: '5px' }}>
                Shorten URL
            </button>

        </Stack>
    
    </div>
    }
    </>
    
  )
}

export default URLShortner
