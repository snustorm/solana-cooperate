'use client'

import Image from 'next/image';
import { useState } from 'react';

export default function CoCreator() {

    <div>111111</div>

    return(
        <div>
      <div className="header">
        Decentralized Value Co-Creation &nbsp;&nbsp; Creator &nbsp;&nbsp; Co-Creator &nbsp;&nbsp; Investor &nbsp;&nbsp; <b>User</b>
      </div>
      <div className="container">
        <div className="column">
          <div className="title">🎮 All Games</div>

          <div className="work">
            <div className="work-header">
              <span>Work 1</span>
              {/* <span>${values[0]}</span> */}
            </div>
            <Image src="/fig/Fig1.jpg" alt="Black Myth: Wukong" width={300} height={200} className="image" />
            <div className="description">Black Myth: Wukong - An action-adventure game based on Chinese mythology.</div>
            <a href="/games/work1" className="button">Detail</a>
          </div>

          <div className="work">
            <div className="work-header">
              <span>Work 2</span>
              {/* <span>${values[1]}</span> */}
            </div>
            <Image src="/fig/Fig2.jpg" alt="Super Mario" width={300} height={200} className="image" />
            <div className="description">Super Mario - A classic platformer game featuring the iconic plumber.</div>
            <a href="#" className="button">Detail</a>
          </div>
        </div>

        <div className="column">
          <div className="title">My Games</div>

          <div className="work">
            <div className="work-header">
              <span>Work 3</span>
              {/* <span>${values[2]}</span> */}
            </div>
            <Image src="/fig/Fig3.jpg" alt="Pokémon" width={300} height={200} className="image" />
            <div className="description">Pokémon - A role-playing game where players catch and train creatures.</div>
            <a href="#" className="button">Detail</a>
          </div>

          <div className="work">
            <div className="work-header">
              <span>Work 4</span>
              {/* <span>${values[3]}</span> */}
            </div>
            <Image src="/fig/Fig4.jpg" alt="Naraka: Bladepoint" width={300} height={200} className="image" />
            <div className="description">Naraka: Bladepoint - A multiplayer action game with martial arts combat.</div>
            <a href="#" className="button">Detail</a>
          </div>
        </div>
      </div>

      <style jsx>{`
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
          text-align: center;
        }
        .header {
          background-color: #ccc;
          padding: 10px;
          font-weight: bold;
        }
        .container {
          display: flex;
          justify-content: center;
          padding: 20px;
        }
        .column {
          width: 45%;
          padding: 10px;
          text-align: center;
        }
        .title {
          font-size: 1.2em;
          margin-bottom: 10px;
        }
        .work {
          margin-bottom: 20px;
        }
        .work-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background-color: #e0e0e0;
        }
        .image {
          width: 100%;
          height: 200px;
          object-fit: contain;
          margin-top: 10px;
        }
        .description {
          height: 120px;
          background-color: #d3d3d3;
          margin-top: 10px;
          padding: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .button {
          text-decoration: none;
          background-color: #ccc;
          padding: 10px 20px;
          border-radius: 5px;
          color: black;
          font-weight: bold;
          display: inline-block;
          margin-top: 10px;
        }
      `}</style>
    </div>
    )
}